export interface Listing {
  address: string; area: string; slug: string; price: string; priceNum: number; beds?: string; baths?: string; sqft?: string; acres?: string; description: string; image: string; listingUrl: string; isLand?: boolean;
}

// Public portfolio pages use notableSales, which are Barry McGovern's documented portfolio records.
// Keep this export for compatibility with older integrations; third-party listing imagery is not presented as Barry's work.
export const activeListings: Listing[] = [];
export const totalPortfolioValue = 0;
