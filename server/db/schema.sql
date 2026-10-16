CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id TEXT UNIQUE,
  username TEXT NOT NULL,
  prestige INT NOT NULL DEFAULT 1,
  credits INT NOT NULL DEFAULT 5000,
  supplies INT NOT NULL DEFAULT 3000,
  fuel INT NOT NULL DEFAULT 2800,
  metal INT NOT NULL DEFAULT 2200,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS territories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES players(id),
  defense INT NOT NULL DEFAULT 40,
  terrain TEXT NOT NULL DEFAULT 'industrial',
  x INT NOT NULL,
  y INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  territory_id UUID REFERENCES territories(id),
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  amount_ton NUMERIC(12, 6) DEFAULT 0,
  amount_tokens INT DEFAULT 0,
  tx_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS battle_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  target_id UUID REFERENCES players(id),
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_territories_owner_id ON territories(owner_id);
CREATE INDEX IF NOT EXISTS idx_orders_player_id ON orders(player_id);
CREATE INDEX IF NOT EXISTS idx_transactions_player_id ON transactions(player_id);
