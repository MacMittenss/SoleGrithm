import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set it in your .env file.');
}

const isLocalDb = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL);

let pool: any;
let db: any;

if (isLocalDb) {
  const pg = await import('pg');
  const Pool = pg.default?.Pool ?? pg.Pool;
  const { drizzle } = await import('drizzle-orm/node-postgres');
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  const { Pool, neonConfig } = await import('@neondatabase/serverless');
  const { drizzle } = await import('drizzle-orm/neon-serverless');
  const ws = (await import('ws')).default;
  neonConfig.webSocketConstructor = ws;
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
}

export { pool, db };