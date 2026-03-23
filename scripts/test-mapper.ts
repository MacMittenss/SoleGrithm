import { mapSneaksProduct } from '../server/services/sneaks-mapper';

const sample = {
  "lowestResellPrice": { "stockX": 230, "flightClub": 212, "goat": 165 },
  "imageLinks": [],
  "_id": "68f5622aac29f9464aed14df",
  "shoeName": "Jordan 4 Retro White Cement (2025)",
  "brand": "Jordan",
  "silhoutte": "Jordan 4 Retro",
  "styleID": "FV5029-100",
  "make": "Jordan 4 Retro",
  "colorway": "Summit White/Fire Red-Tech Grey-Black",
  "retailPrice": 225,
  "thumbnail": "https://images.stockx.com/images/Air-Jordan-4-Retro-White-Cement-2025-Product.jpg",
  "releaseDate": "2025-05-24",
  "description": "The 2025 version...",
  "urlKey": "air-jordan-4-retro-white-cement-2025",
};

console.log(mapSneaksProduct(sample, { source: 'test' }));
