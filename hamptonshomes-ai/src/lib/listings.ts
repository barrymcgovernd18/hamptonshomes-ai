export interface Listing {
  address: string;
  area: string;
  slug: string;
  price: string;
  priceNum: number;
  status: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  acres?: string;
  description: string;
  image: string;
  listingUrl: string;
  isLand?: boolean;
}

export const activeListings: Listing[

];

export const totalPortfolioValue = activeListings
  .filter((l) => l.status !== "For Rent")
  .reduce((sum, l) => sum + l.priceNum, 0);
