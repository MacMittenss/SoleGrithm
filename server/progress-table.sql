-- SQL migration for resume feature
CREATE TABLE IF NOT EXISTS aggregation_progress (
  id SERIAL PRIMARY KEY,
  job_name VARCHAR(64) NOT NULL,
  brand VARCHAR(64),
  batch INTEGER,
  sneaker_id BIGINT,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Example usage: update progress after each batch
-- INSERT INTO aggregation_progress (job_name, brand, batch, sneaker_id) VALUES ('sneaker_aggregation', 'Nike', 2, 12345)
-- ON CONFLICT (job_name) DO UPDATE SET brand=EXCLUDED.brand, batch=EXCLUDED.batch, sneaker_id=EXCLUDED.sneaker_id, last_updated=NOW();
