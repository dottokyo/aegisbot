CREATE TABLE IF NOT EXISTS users (
    wallet TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS traders (
    wallet TEXT PRIMARY KEY,
    display_name TEXT,
    roi_7d REAL DEFAULT 0,
    winrate REAL DEFAULT 0,
    volume_7d REAL DEFAULT 0,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscriber_wallet TEXT,
    trader_wallet TEXT,
    ratio REAL,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mirror_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trader_wallet TEXT,
    subscriber_wallet TEXT,
    symbol TEXT,
    side TEXT,
    amount REAL,
    leverage REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
