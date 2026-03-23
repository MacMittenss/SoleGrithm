import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

const sql = `
CREATE TABLE IF NOT EXISTS geographic_trends (
  id serial PRIMARY KEY,
  city text NOT NULL,
  state text NOT NULL,
  country text DEFAULT 'US',
  latitude decimal(10,7) NOT NULL,
  longitude decimal(10,7) NOT NULL,
  sneaker_id integer REFERENCES sneakers(id),
  trend_score integer NOT NULL,
  search_volume integer DEFAULT 0,
  price_change_percent decimal(5,2) DEFAULT 0,
  popularity_rank integer DEFAULT 1,
  last_updated timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);
`;

async function main() {
  const conn = await pool.connect();
  try {
    await conn.query(sql);
    console.log('geographic_trends table ensured');
  } catch (err) {
    console.error('create table error', err);
    process.exit(1);
  } finally {
    await conn.release();
    process.exit(0);
  }
}

main();
