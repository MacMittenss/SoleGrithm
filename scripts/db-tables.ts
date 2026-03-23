// removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
import { pool } from '../server/db';

(async () => {
  try {
    const res = await (pool as any).query('SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN (\'pg_catalog\', \'information_schema\') ORDER BY schemaname, tablename;');
    console.log('tables:', res && res.rows ? res.rows : res);
  } catch (err) {
    const e:any = err;
    console.error('error listing tables:', e && (e.message || e));
    process.exit(2);
  } finally {
    process.exit(0);
  }
})();
