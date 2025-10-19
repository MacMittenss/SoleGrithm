-- Sneakers table for SoleGrithm
CREATE TABLE IF NOT EXISTS sneakers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT,
  brandId BIGINT,
  description TEXT,
  images TEXT[],
  retailPrice TEXT,
  releaseDate TIMESTAMP,
  categories TEXT[],
  sizes TEXT[],
  materials TEXT,
  colorway TEXT
);