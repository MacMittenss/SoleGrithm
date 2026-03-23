// removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
import SneaksNpmService from '../server/services/sneaks-npm';

(async () => {
  try {
    console.log('[debug-sneaks-fetch] fetching 5 items...');
    const products = await SneaksNpmService.getMostPopular(5);
    console.log('[debug-sneaks-fetch] got', Array.isArray(products) ? products.length : 0);
    products.forEach((p, i) => {
      console.log('--- Product', i + 1, '---');
      console.log(JSON.stringify(p, null, 2));
    });
  } catch (err) {
    const e: any = err;
    console.error('[debug-sneaks-fetch] error:', e && (e.message || e));
    if ((err as any)?.response) console.error('response:', (err as any).response?.body || (err as any).response);
  }
})();
