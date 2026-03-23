import SneaksNpmService from '../server/services/sneaks-npm.js';

(async function(){
  try{
    const data = await SneaksNpmService.getMostPopular(5);
    console.log('Got', Array.isArray(data) ? data.length : typeof data, 'items');
    console.log(JSON.stringify(data, null, 2).substring(0, 2000));
  }catch(e){
    console.error('Error calling sneaks:', e);
  }
})();
