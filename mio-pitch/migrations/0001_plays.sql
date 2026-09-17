CREATE TABLE IF NOT EXISTS play_events(event_id TEXT PRIMARY KEY,track_id TEXT NOT NULL,played_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,city TEXT,region TEXT,country TEXT);
CREATE INDEX IF NOT EXISTS play_events_track_time ON play_events(track_id,played_at);
