import { marketAggregator } from '../server/services/sneaker-market-aggregator';

async function main() {
  const query = 'Air Jordan 4 Retro White Cement';
  console.log('Searching market aggregator for:', query);
  const results = await marketAggregator.searchSneakers(query, 10);
  console.log('Results:');
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
