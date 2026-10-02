CREATE TABLE IF NOT EXISTS proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  a_name TEXT NOT NULL,
  a_date TEXT,
  a_place TEXT,
  a_why TEXT,
  a_promise TEXT,
  a_message TEXT,
  b_name TEXT,
  b_date TEXT,
  b_message TEXT,
  b_promise TEXT,
  accepted INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_proposals_code ON proposals(code);