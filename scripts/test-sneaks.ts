import SneaksNpmService from '../server/services/sneaks-npm';

(async function(){
  try{
    const data = await SneaksNpmService.getMostPopular(5);
    console.log('Got items:', Array.isArray(data) ? data.length : typeof data);
    console.log(JSON.stringify(data, null, 2).slice(0, 2000));
  }catch(e){
    console.error('Error calling sneaks:', e);
  }
})();
