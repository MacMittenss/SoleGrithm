// Standard footwear sizes for different categories
export const FOOTWEAR_SIZES = {
  // Men's US sizes (most common for sneakers)
  mens: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15'],
  
  // Women's US sizes 
  womens: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  
  // Kids sizes
  kids: ['10C', '10.5C', '11C', '11.5C', '12C', '12.5C', '13C', '13.5C', '1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y', '7Y'],
  
  // Unisex/General (combines common men's and women's sizes)
  unisex: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']
};

/**
 * Get appropriate size array based on sneaker name/category
 */
export function getSizesForSneaker(name?: string, categories?: string[]): string[] {
  if (!name && !categories?.length) {
    return FOOTWEAR_SIZES.unisex;
  }
  
  const nameLower = (name || '').toLowerCase();
  const categoryStr = (categories || []).join(' ').toLowerCase();
  const combined = `${nameLower} ${categoryStr}`;
  
  // Check if this is NOT footwear - return empty array for clothing items
  if (combined.includes('jacket') || combined.includes('hoodie') || combined.includes('shirt') || 
      combined.includes('pants') || combined.includes('shorts') || combined.includes('hat') ||
      combined.includes('cap') || combined.includes('bag') || combined.includes('backpack') ||
      combined.includes('socks') || combined.includes('underwear') || combined.includes('tee')) {
    return [];
  }
  
  // Check for women's specific indicators
  if (combined.includes('women') || combined.includes('wmns') || combined.includes('female')) {
    return FOOTWEAR_SIZES.womens;
  }
  
  // Check for kids indicators
  if (combined.includes('kid') || combined.includes('child') || combined.includes('youth') || 
      combined.includes('ps') || combined.includes('pre-school') || combined.includes('grade school') || 
      combined.includes('gs') || combined.includes('toddler') || combined.includes('infant')) {
    return FOOTWEAR_SIZES.kids;
  }
  
  // Default to men's/unisex for most sneakers
  return FOOTWEAR_SIZES.mens;
}

/**
 * Get a subset of sizes (for products with limited size runs)
 */
export function getLimitedSizes(name?: string, categories?: string[], count: number = 8): string[] {
  const allSizes = getSizesForSneaker(name, categories);
  const startIndex = Math.floor((allSizes.length - count) / 2);
  return allSizes.slice(startIndex, startIndex + count);
}