import { pool } from '../server/db';

/**
 * Fast truncate of the `sneakers` table. Dangerous!
 * Usage: CONFIRM_DELETE_SNEAKERS=yes npx tsx scripts/truncate-sneakers.ts
 */
async function main() {
  const confirm = (process.env.CONFIRM_DELETE_SNEAKERS || '').toLowerCase();
  if (confirm !== 'yes') {
    console.log('CONFIRM_DELETE_SNEAKERS is not set to "yes". Aborting.');
    console.log('If you really want to truncate sneakers, run:');
    console.log('  CONFIRM_DELETE_SNEAKERS=yes npx tsx scripts/truncate-sneakers.ts');
    process.exit(1);
  }

  try {
    console.log('Running TRUNCATE TABLE sneakers RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE "sneakers" RESTART IDENTITY CASCADE;');
    console.log('Truncate completed.');
    process.exit(0);
  } catch (err) {
    console.error('Truncate failed:', (err as any)?.message || err);
    process.exit(2);
  }
}

main();
