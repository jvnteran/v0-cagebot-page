#!/usr/bin/env node
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const { randomUUID } = require("node:crypto")
const { parse } = require("csv-parse/sync")
const { createClient } = require("@supabase/supabase-js")

function parseArgs(argv) {
  const options = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith("--")) continue
    const key = arg.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith("--")) {
      options[key] = true
    } else {
      options[key] = next
      i += 1
    }
  }
  return options
}

function loadCsv(filePath) {
  const fullPath = resolve(process.cwd(), filePath)
  const raw = readFileSync(fullPath, "utf8")
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
}

function normaliseRows(rows, eventId) {
  return rows.map((row) => {
    const cleaned = {}
    for (const [key, value] of Object.entries(row)) {
      if (value === undefined || value === null) continue
      const trimmed = typeof value === "string" ? value.trim() : value
      cleaned[key] = trimmed === "" ? null : trimmed
    }
    if (!cleaned.id) {
      cleaned.id = randomUUID()
    }
    if (eventId && !cleaned.event_id) {
      cleaned.event_id = eventId
    }
    return cleaned
  })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help || args.h) {
    console.log(`
Usage: node scripts/import-event-data.cjs --event <event_id> [--picks path/to/picks.csv] [--results path/to/results.csv] [--status completed]

Required:
  --event     Event UUID to associate with rows (used when CSV rows omit event_id)

Optional:
  --picks     Path to CSV containing pick rows (columns should match public.picks)
  --results   Path to CSV containing result rows (columns should match public.results)
  --status    Override event status after import (defaults to "completed" when --results provided)
`)
    process.exit(0)
  }

  const eventId = args.event
  const picksPath = args.picks
  const resultsPath = args.results
  const statusOverride = args.status

  if (!eventId) {
    console.error("Missing required --event <event_id> argument")
    process.exit(1)
  }

  if (!picksPath && !resultsPath) {
    console.error("Provide at least one CSV via --picks or --results")
    process.exit(1)
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables before running this script.")
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  if (picksPath) {
    const picksRows = normaliseRows(loadCsv(picksPath), eventId)
    if (picksRows.length) {
      const { error } = await supabase.from("picks").upsert(picksRows, { onConflict: "id" })
      if (error) {
        console.error("Failed to upsert picks:", error.message)
        process.exit(1)
      }
      console.log(`Upserted ${picksRows.length} pick rows`)
    }
  }

  let insertedResults = 0
  if (resultsPath) {
    const resultsRows = normaliseRows(loadCsv(resultsPath), eventId)
    if (resultsRows.length) {
      const { error } = await supabase.from("results").upsert(resultsRows, { onConflict: "id" })
      if (error) {
        console.error("Failed to upsert results:", error.message)
        process.exit(1)
      }
      insertedResults = resultsRows.length
      console.log(`Upserted ${resultsRows.length} result rows`)
    }
  }

  const shouldComplete = statusOverride || insertedResults > 0
  if (shouldComplete) {
    const nextStatus = statusOverride || "completed"
    const { error } = await supabase
      .from("events")
      .update({ status: nextStatus })
      .eq("id", eventId)
    if (error) {
      console.error("Failed to update event status:", error.message)
      process.exit(1)
    }
    console.log(`Event ${eventId} marked as ${nextStatus}`)
  }

  console.log("Import finished successfully")
}

main().catch((error) => {
  console.error("Import failed:", error)
  process.exit(1)
})
