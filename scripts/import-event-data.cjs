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

function normaliseRows(rows) {
  return rows.map((row) => {
    const cleaned = {}
    for (const [key, value] of Object.entries(row)) {
      if (value === undefined || value === null) continue
      const trimmed = typeof value === "string" ? value.trim() : value
      cleaned[key] = trimmed === "" ? null : trimmed
    }
    return cleaned
  })
}

function toNumber(value) {
  if (value === undefined || value === null) return null
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  const cleaned = value.replace(/[%,$]/g, "").trim()
  if (!cleaned) return null
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function toProbability(value) {
  if (value === undefined || value === null) return null
  if (typeof value === "number") return value
  if (value.includes("%")) {
    const percent = toNumber(value)
    return percent === null ? null : percent / 100
  }
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeConfidence(raw) {
  if (!raw) return "medium"
  const value = raw.toLowerCase()
  if (value.includes("high")) return "high"
  if (value.includes("low")) return "low"
  return "medium"
}

function normalizeFightLabel(label) {
  if (!label) return null
  return label
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/vs\./g, "vs")
    .trim()
}

function buildFightKey(fighterA, fighterB) {
  return normalizeFightLabel(`${fighterA} vs ${fighterB}`)
}

function splitFightParticipants(label) {
  if (!label) return null
  const parts = label
    .split(/vs/i)
    .map((part) => part.replace(/[-–—]/g, " ").trim())
    .filter(Boolean)
  if (parts.length !== 2) return null
  return parts
}

async function fetchFightMap(supabase, eventId) {
  const { data, error } = await supabase
    .from("fights")
    .select("id,fighter_a_name,fighter_b_name")
    .eq("event_id", eventId)

  if (error) {
    throw new Error(`Unable to load fights for event ${eventId}: ${error.message}`)
  }

  const map = new Map()
  for (const fight of data ?? []) {
    const forward = buildFightKey(fight.fighter_a_name, fight.fighter_b_name)
    const reverse = buildFightKey(fight.fighter_b_name, fight.fighter_a_name)
    if (forward) {
      map.set(forward, fight.id)
    }
    if (reverse) {
      map.set(reverse, fight.id)
    }
  }
  return map
}

function transformPickRows(rows, eventId, fightMap, modelRunId) {
  const normalised = normaliseRows(rows)
  const transformed = []

  for (const row of normalised) {
    const fightLabel = row["Fight"] || row.fight
    const fightKey = normalizeFightLabel(fightLabel)
    const fightId = fightKey ? fightMap.get(fightKey) : null
    if (!fightId) {
      console.warn(`Skipping pick for unknown fight: "${fightLabel}"`)
      continue
    }

    const confidenceDisplay = row["Model probability"] || row.model_probability
    const confidencePercentage = toNumber(confidenceDisplay)
    const modelProbability = toProbability(confidenceDisplay)
    const bettingOdds = toNumber(row["Betting odds"] || row.betting_odds)
    const keyEdgesRaw = row["Why/Key Data Edges"] || row.why_key_edges || ""

    transformed.push({
      id: randomUUID(),
      fight_id: fightId,
      event_id: eventId,
      model_run_id: modelRunId,
      predicted_winner: row["Model pick"] || row.model_pick,
      confidence_level: normalizeConfidence(row.confidence_level),
      confidence_percentage: confidencePercentage,
      model_probability: modelProbability,
      model_probability_display: confidenceDisplay || null,
      betting_odds: bettingOdds,
      betting_odds_display: row["Betting odds"] || row.betting_odds || null,
      edge_vs_market: toNumber(row.edge_vs_market),
      why_key_edges: keyEdgesRaw || null,
      key_edges: keyEdgesRaw ? keyEdgesRaw.split("  |  ").map((edge) => edge.trim()).filter(Boolean) : null,
      analysis: row.analysis || keyEdgesRaw || null,
    })
  }

  return transformed
}

function transformResultRows(rows, eventId, fightMap) {
  const normalised = normaliseRows(rows)
  const transformed = []

  for (const row of normalised) {
    const fightLabel = row["Fight"] || row.fight
    const fightKey = normalizeFightLabel(fightLabel)
    const fightId = fightKey ? fightMap.get(fightKey) : null
    if (!fightId) {
      console.warn(`Skipping result for unknown fight: "${fightLabel}"`)
      continue
    }

    const fighter1 = row["Fighter 1"] || row.fighter_1
    const fighter2 = row["Fighter 2"] || row.fighter_2
    const winner = row["Winner"] || row.winner
    let loser = row["Loser"] || row.loser
    if (!loser && winner && fighter1 && fighter2) {
      loser = [fighter1, fighter2].find((name) => name !== winner) || null
    }

    transformed.push({
      id: randomUUID(),
      fight_id: fightId,
      event_id: eventId,
      winner,
      loser,
      result_code: row["Result code"] || row.result_code || null,
      method: row["Finish method"] || row.finish_method || null,
      method_detail: row["Finish detail"] || row.finish_detail || null,
      round: toNumber(row["Finish round"] || row.finish_round),
      time: row["Finish time"] || row.finish_time || null,
      result_source: row.result_source || "Manual import",
      model_pick: row.model_pick || null,
      model_probability: toNumber(row.model_probability),
      market_probability: toNumber(row.market_probability),
      edge: toNumber(row.edge),
      model_result: row.model_result || null,
      notes: row.notes || null,
    })
  }

  return transformed
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
  --model-run Model run UUID to associate with picks (defaults to seed ID)
  --create-fights  Insert fights that are missing for the target event (parsed from the Fight column)
`)
    process.exit(0)
  }

  const eventId = args.event
  const picksPath = args.picks
  const resultsPath = args.results
  const statusOverride = args.status
  const modelRunId = args["model-run"] || args.modelRun || "0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa"
  const shouldCreateFights = Boolean(args["create-fights"] || args.createFights)

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
  const picksRaw = picksPath ? loadCsv(picksPath) : null
  const resultsRaw = resultsPath ? loadCsv(resultsPath) : null

  const fightLabels = new Set()
  for (const row of picksRaw ?? []) {
    if (row.Fight || row.fight) {
      fightLabels.add(row.Fight || row.fight)
    }
  }
  for (const row of resultsRaw ?? []) {
    if (row.Fight || row.fight) {
      fightLabels.add(row.Fight || row.fight)
    }
  }

  const fightMap = await fetchFightMap(supabase, eventId)
  if (!fightMap.size) {
    console.warn(`No fights currently stored for event ${eventId}.`)
  }

  if (shouldCreateFights && fightLabels.size) {
    const missingLabels = Array.from(fightLabels).filter((label) => {
      const key = normalizeFightLabel(label)
      return key && !fightMap.has(key)
    })
    if (missingLabels.length) {
      const newFights = []
      let fightOrder = fightMap.size + 1
      for (const label of missingLabels) {
        const fighters = splitFightParticipants(label)
        if (!fighters) {
          console.warn(`Cannot parse fight label "${label}" to create a fight.`)
          continue
        }
        const [a, b] = fighters
        const id = randomUUID()
        newFights.push({
          id,
          event_id: eventId,
          fighter_a_name: a,
          fighter_b_name: b,
          weight_class: null,
          is_main_event: false,
          fight_order: fightOrder++,
        })
        const forward = buildFightKey(a, b)
        const reverse = buildFightKey(b, a)
        fightMap.set(forward, id)
        fightMap.set(reverse, id)
      }

      if (newFights.length) {
        const { error } = await supabase.from("fights").insert(newFights)
        if (error) {
          console.error("Failed to create missing fights:", error.message)
          process.exit(1)
        }
        console.log(`Inserted ${newFights.length} new fights for event ${eventId}`)
      }
    }
  }

  if (!fightMap.size) {
    console.error(`No fights available for event ${eventId}. Seed or create fights before importing picks/results.`)
    process.exit(1)
  }

  if (picksPath) {
    const pickRows = transformPickRows(picksRaw, eventId, fightMap, modelRunId)
    if (pickRows.length) {
      const { error } = await supabase.from("picks").upsert(pickRows, { onConflict: "id" })
      if (error) {
        console.error("Failed to upsert picks:", error.message)
        process.exit(1)
      }
      console.log(`Upserted ${pickRows.length} pick rows`)
    }
  }

  let insertedResults = 0
  if (resultsPath) {
    const resultRows = transformResultRows(resultsRaw, eventId, fightMap)
    if (resultRows.length) {
      const { error } = await supabase.from("results").upsert(resultRows, { onConflict: "id" })
      if (error) {
        console.error("Failed to upsert results:", error.message)
        process.exit(1)
      }
      insertedResults = resultRows.length
      console.log(`Upserted ${resultRows.length} result rows`)
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
