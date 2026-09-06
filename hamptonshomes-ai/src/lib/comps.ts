import { notableSales } from "@/lib/sales";

export interface TownComp {
  address: string;
  village: string;
  soldPrice: number;
  soldDate: string | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lotAcres: number | null;
  microMarket: string | null;
}

export interface TownCompsResult {
  comps: TownComp[];
  source: "live" | "curated";
}

type LiveComp = {
  address?: string | null;
  village?: string | null;
  sold_price?: number | null;
  sold_date?: string | null;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  lot_acres?: number | null;
  micro_market?: string | null;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

function curatedFallback(area: string): TownComp[] {
  return notableSales
    .filter((sale) => sale.area.toLowerCase() === area.toLowerCase())
    .slice(0, 4)
    .map((sale) => {
      const dateMatch = sale.status.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
      const soldDate = dateMatch
        ? (() => { const [month, day, year] = dateMatch[1].split("/"); return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; })()
        : null;
      return {
        address: sale.address,
        village: sale.area,
        soldPrice: Number(sale.price.replace(/[^0-9]/g, "")) || 0,
        soldDate,
        beds: sale.beds ? Number(sale.beds) : null,
        baths: sale.baths ? Number.parseFloat(sale.baths) : null,
        sqft: sale.sqft ? Number(sale.sqft.replace(/,/g, "")) : null,
        lotAcres: sale.acres ? Number.parseFloat(sale.acres) : null,
        microMarket: null,
      };
    });
}

export async function getTownComps(area: string): Promise<TownCompsResult> {
  const fallback = curatedFallback(area);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return { comps: fallback, source: "curated" };

  const endpoint = `${SUPABASE_URL}/rest/v1/comparable_sales?select=address,village,sold_price,sold_date,beds,baths,sqft,lot_acres,micro_market&village=eq.${encodeURIComponent(area)}&sold_date=not.is.null&order=sold_date.desc&limit=10`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
    const rows = (await response.json()) as LiveComp[];
    const comps = rows
      .filter((row) => row.address && !/^0{3,}|undisclosed/i.test(row.address))
      .filter((row) => typeof row.sold_price === "number" && row.sold_price > 0)
      .slice(0, 4)
      .map((row) => ({
        address: row.address!,
        village: row.village || area,
        soldPrice: row.sold_price!,
        soldDate: row.sold_date || null,
        beds: row.beds ?? null,
        baths: row.baths ?? null,
        sqft: row.sqft ?? null,
        lotAcres: row.lot_acres ?? null,
        microMarket: row.micro_market ?? null,
      }));
    return { comps: comps.length ? comps : fallback, source: comps.length ? "live" : "curated" };
  } catch {
    return { comps: fallback, source: "curated" };
  }
}
