// Script to update existing sneakers with proper footwear sizes
/*
  scripts/update-sneaker-sizes.ts
  - Updates existing sneakers in the database that have empty sizes arrays
  - Populates them with appropriate footwear sizes based on sneaker name and categories
  
  Usage:
    # Dry-run (default): shows what would be updated
    npx tsx scripts/update-sneaker-sizes.ts

    # To actually update the database
    npx tsx scripts/update-sneaker-sizes.ts --confirm
*/

import { storage } from '../server/storage';
import { getSizesForSneaker } from '../server/utils/sneaker-sizes';

function parseArgs(argv: string[]) {
  const out: Record<string, any> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    if (a.includes('=')) {
      const [k, v] = a.split('=');
      out[k.replace(/^--/, '')] = v;
    } else {
      const key = a.replace(/^--/, '');
      out[key] = true;
    }
  }
  return out;
}

(async function main() {
  const argv = parseArgs(process.argv.slice(2));
  const confirmed = argv.confirm === true || argv.confirm === 'true';
  const dryRun = !confirmed;

  console.log('[update-sneaker-sizes] mode:', dryRun ? 'dry-run' : 'update');

  try {
    // Get all sneakers from the database
    const sneakers = await storage.getAllSneakers();
    console.log(`[update-sneaker-sizes] found ${sneakers.length} sneakers in database`);

    // Filter to those with empty or missing sizes
    const sneakersToUpdate = sneakers.filter(sneaker => 
      !sneaker.sizes || sneaker.sizes.length === 0
    );

    console.log(`[update-sneaker-sizes] ${sneakersToUpdate.length} sneakers need size updates`);

    if (sneakersToUpdate.length === 0) {
      console.log('[update-sneaker-sizes] no sneakers need updating');
      return process.exit(0);
    }

    // Show sample of what would be updated
    const sample = sneakersToUpdate.slice(0, 5);
    console.log('[update-sneaker-sizes] sample sneakers to update:');
    sample.forEach((sneaker, idx) => {
      const newSizes = getSizesForSneaker(sneaker.name, sneaker.categories || []);
      console.log(`${idx + 1}. "${sneaker.name}" -> sizes: [${newSizes.join(', ')}]`);
    });

    if (dryRun) {
      console.log('[update-sneaker-sizes] dry-run enabled, not updating database. To update, pass --confirm');
      return process.exit(0);
    }

    console.log('[update-sneaker-sizes] updating sneakers...');
    let updated = 0;

    for (const sneaker of sneakersToUpdate) {
      try {
        const newSizes = getSizesForSneaker(sneaker.name, sneaker.categories || []);
        
        await storage.updateSneaker(sneaker.id, {
          sizes: newSizes
        });

        updated++;
        if (updated % 10 === 0) {
          console.log(`[update-sneaker-sizes] updated ${updated}/${sneakersToUpdate.length} sneakers`);
        }
      } catch (err) {
        console.error(`[update-sneaker-sizes] error updating sneaker ${sneaker.id}:`, err);
      }
    }

    console.log(`[update-sneaker-sizes] finished. updated ${updated} sneakers`);
    process.exit(0);

  } catch (err) {
    console.error('[update-sneaker-sizes] unexpected error:', err);
    process.exit(2);
  }
})();