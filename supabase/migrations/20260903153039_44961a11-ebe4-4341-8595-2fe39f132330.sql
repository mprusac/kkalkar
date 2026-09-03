ALTER TABLE public.players
  ADD COLUMN IF NOT EXISTS sofascore_link text,
  ADD COLUMN IF NOT EXISTS nationality text,
  ADD COLUMN IF NOT EXISTS height_cm integer,
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS season_stats jsonb NOT NULL DEFAULT '{}'::jsonb;