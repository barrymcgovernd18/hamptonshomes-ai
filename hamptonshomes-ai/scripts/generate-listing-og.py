"""Generate 1200x630 share cards for /listings/[slug] into public/og/listings/, in the same style as generate-og.py.

Run from the app root:  python3 scripts/generate-listing-og.py
"""
import os, re, runpy

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
src = open(os.path.join(HERE, "generate-og.py")).read()
# Reuse the helpers only (everything above the page list).
helpers = src[: src.index("made = []")]
ns = {"__file__": os.path.join(HERE, "generate-og.py")}
exec(compile(helpers, "generate-og.py", "exec"), ns)

data = open(os.path.join(ROOT, "src/lib/listing-pages.ts")).read()
blocks = re.split(r"\n  \{\n", data[data.index("export const listingPages"):])[1:]
n = 0
for b in blocks:
    get = lambda k: (re.search(rf'^\s*{k}: "([^"]*)"', b, re.M) or [None, ""])[1]
    slug, address, area, status = get("slug"), get("address"), get("area"), get("status")
    price = int(re.search(r"^\s*price: (\d+)", b, re.M).group(1))
    image = re.search(r'images: \["([^"]+)"', b).group(1)
    ns["card"](f"listings/{slug}", address, f"{area} · ${price:,}", eyebrow=f"{status} · Hedgerow Exclusive Properties", image=image)
    n += 1
print(n, "listing cards")
