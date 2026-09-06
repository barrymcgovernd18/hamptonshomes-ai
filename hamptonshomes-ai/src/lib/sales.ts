export interface Sale {
  address: string;
  area: string;
  slug: string;
  price: string;
  status: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  acres?: string;
  description?: string;
  image?: string;
  listingUrl?: string;
}

export const notableSales: Sale[

];

export const personalVolume = "$250M+";
export const teamVolume = "$2B+";
