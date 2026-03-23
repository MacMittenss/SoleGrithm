Clear sneakers script
=====================

This folder contains admin scripts for maintenance tasks.

clear-sneakers.ts
------------------

- Purpose: Deletes all rows in the `sneakers` table and related dependent records (collections, price_history, market_prices, reviews, geographic_trends).
- Safety: The script will refuse to run unless the environment variable `CONFIRM_DELETE_SNEAKERS` is set to `yes`.
- Usage (run from repository root):

```bash
CONFIRM_DELETE_SNEAKERS=yes npx tsx scripts/clear-sneakers.ts
```

Important: This operation is irreversible. Ensure you have backups or are operating on a development database before running.
