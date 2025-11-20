import os
import json
from supabase import create_client, Client

# This script imports UFC 322 event and pick data into Supabase
# It uses the v0 environment variables automatically

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not supabase_url or not supabase_key:
    print("Error: Missing Supabase credentials")
    exit(1)

supabase: Client = create_client(supabase_url, supabase_key)

# UFC 322 Event Data
event_id = "550e8400-e29b-41d4-a716-446655440000"

event_data = {
    "id": event_id,
    "name": "UFC 322: Pereira vs Hill",
    "date": "2025-01-18",
    "location": "Las Vegas, Nevada",
    "status": "upcoming",
    "poster_url": "/placeholder.svg?height=600&width=400"
}

print("Inserting event...")
event_result = supabase.table("events").upsert(event_data).execute()
print(f"Event inserted: {event_result.data}")

# Fights Data
fights = [
    {
        "id": "fight-1",
        "event_id": event_id,
        "fighter_a_name": "Alex Pereira",
        "fighter_b_name": "Jamahal Hill",
        "weight_class": "Light Heavyweight",
        "is_main_event": True,
        "fight_order": 1
    },
    {
        "id": "fight-2",
        "event_id": event_id,
        "fighter_a_name": "Amanda Nunes",
        "fighter_b_name": "Julianna Peña",
        "weight_class": "Women's Bantamweight",
        "is_main_event": False,
        "fight_order": 2
    },
    # Add more fights as needed
]

print("Inserting fights...")
fights_result = supabase.table("fights").upsert(fights).execute()
print(f"Inserted {len(fights)} fights")

# Picks Data
picks = [
    {
        "id": "pick-1",
        "fight_id": "fight-1",
        "event_id": event_id,
        "predicted_winner": "Alex Pereira",
        "confidence_level": "high",
        "confidence_percentage": 78.5,
        "model_probability": 0.785,
        "betting_odds": -250,
        "edge_vs_market": 8.5,
        "why_key_edges": "Superior striking accuracy  |  Knockout power advantage  |  Experience in championship fights",
        "key_edges": ["Superior striking accuracy", "Knockout power advantage", "Experience in championship fights"]
    },
    {
        "id": "pick-2",
        "fight_id": "fight-2",
        "event_id": event_id,
        "predicted_winner": "Amanda Nunes",
        "confidence_level": "medium",
        "confidence_percentage": 65.2,
        "model_probability": 0.652,
        "betting_odds": -180,
        "edge_vs_market": 5.2,
        "why_key_edges": "Wrestling dominance  |  Cardio advantage  |  Proven championship pedigree",
        "key_edges": ["Wrestling dominance", "Cardio advantage", "Proven championship pedigree"]
    },
]

print("Inserting picks...")
picks_result = supabase.table("picks").upsert(picks).execute()
print(f"Inserted {len(picks)} picks")

print("\n✅ Import completed successfully!")
print(f"Event: {event_data['name']}")
print(f"Fights: {len(fights)}")
print(f"Picks: {len(picks)}")
