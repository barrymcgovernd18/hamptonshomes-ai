"""Generate branded 1200x630 Open Graph cards into public/og/ and the manifest src/lib/og-images.ts.

Run from the app root:  python3 scripts/generate-og.py
Needs Pillow and the Cormorant Garamond and Inter variable fonts installed (fc-list).
"""
import os, re, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(PUB, "og")
W, H = 1200, 630
PAPER = (244, 240, 232)
OCEAN = (22, 45, 53)


def font_path(family, italic=False):
    out = subprocess.run(["fc-list", f"{family}:{'italic' if italic else 'roman'}", "file"], capture_output=True, text=True).stdout
    files = sorted({l.split(":")[0].strip() for l in out.splitlines() if l.strip()})
    files = [f for f in files if ("Italic" in f) == italic]
    return files[0]


SERIF = font_path("Cormorant Garamond")
SERIF_IT = font_path("Cormorant Garamond", italic=True)
SANS = font_path("Inter")


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        axes = f.get_variation_axes()
        f.set_variation_by_axes([weight if a.get("name", b"") in (b"Weight", "Weight") else a["default"] for a in axes])
    except Exception:
        pass
    return f


def tracked(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def wrap(draw, text, fnt, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= width:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def photo(src, pos=(0.5, 0.5)):
    im = Image.open(os.path.join(PUB, src.lstrip("/"))).convert("RGB")
    im = ImageOps.fit(im, (W, H), Image.LANCZOS, centering=pos)
    im = im.convert("RGB")
    return ImageEnhance.Contrast(im).enhance(1.06)


def shade(im):
    """Ocean-tinted gradient from the left and bottom, as on the site's heroes."""
    ov = Image.new("RGBA", (W, H))
    px = ov.load()
    for x in range(W):
        for y in range(H):
            a = max(0.0, 0.9 - x / W * 1.1) + max(0.0, (y / H - 0.3) * 1.25)
            px[x, y] = (12, 24, 29, int(255 * min(0.92, a)))
    return Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")


def card(name, title, sub=None, eyebrow="Hamptons Real Estate", image=None, pos=(0.5, 0.5), portrait=False):
    if portrait:
        im = Image.new("RGB", (W, H), OCEAN)
        p = Image.open(os.path.join(PUB, image.lstrip("/"))).convert("RGB")
        p = ImageOps.grayscale(ImageOps.fit(p, (520, H), Image.LANCZOS, centering=(0.5, 0.2))).convert("RGB")
        mask = Image.new("L", (520, H), 255)
        md = ImageDraw.Draw(mask)
        for x in range(200):
            md.line([(x, 0), (x, H)], fill=int(255 * x / 200))
        im.paste(p, (W - 520, 0), mask)
    elif image:
        im = shade(photo(image, pos))
    else:
        im = Image.new("RGB", (W, H), OCEAN)
    d = ImageDraw.Draw(im)
    eb = font(SANS, 15, 500)
    tracked(d, (64, 58), "BARRY MCGOVERN", eb, PAPER, 4.5)
    tracked(d, (64, 84), eyebrow.upper(), eb, (205, 212, 210), 3.6)
    size = 92 if len(title) < 22 else 74
    while True:
        tf = font(SERIF, size, 300)
        lines = wrap(d, title, tf, 780 if not portrait else 600)
        if len(lines) <= 3 or size <= 50:
            break
        size -= 4
    sf = font(SERIF_IT, 32, 300)
    sub_lines = wrap(d, sub, sf, 700 if not portrait else 580)[:2] if sub else []
    block = len(lines) * size * 1.02 + (24 + len(sub_lines) * 40 if sub_lines else 0)
    y = H - 118 - block
    for line in lines:
        d.text((62, y), line, font=tf, fill=PAPER)
        y += size * 1.02
    if sub_lines:
        y += 22
        for line in sub_lines:
            d.text((64, y), line, font=sf, fill=(225, 228, 224))
            y += 40
    d.line([(64, H - 78), (W - 64, H - 78)], fill=(110, 125, 128), width=1)
    ft = font(SANS, 13, 500)
    tracked(d, (64, H - 56), "LICENSED REAL ESTATE SALESPERSON · HEDGEROW EXCLUSIVE PROPERTIES", ft, (215, 220, 218), 2.6)
    url = "HAMPTONSHOMES.AI"
    uw = sum(d.textlength(c, font=ft) + 2.6 for c in url)
    tracked(d, (W - 64 - uw, H - 56), url, ft, (215, 220, 218), 2.6)
    path = os.path.join(OUT, name + ".jpg")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, quality=84, optimize=True, progressive=True)
    return name


def parse(path, fields, start_marker):
    s = open(os.path.join(ROOT, path)).read()
    s = s[s.index(start_marker):]
    items = []
    for block in re.split(r"\n  \{\n", s)[1:]:
        item = {}
        for f in fields:
            m = re.search(rf'^\s*"?{f}"?:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block, re.M)
            if m:
                item[f] = m.group(1).replace("\\'", "'").replace('\\"', '"')
        if "slug" in item:
            items.append(item)
    return items


made = []
made.append(card("home", "Barry McGovern", "Oceanfront, waterfront, and estate properties, from Southampton to Montauk.", image="/images/barry-mcgovern-2.jpg", pos=(0.5, 0.6)))
made.append(card("about", "Barry McGovern", "Dublin-born, a Sag Harbor local since 2013.", eyebrow="About", image="/images/barry-mcgovern.jpg", portrait=True))
made.append(card("sales", "Hedgerow Portfolio", "Listings and sales across the Hamptons.", eyebrow="Portfolio", image="/images/43-east-dune-lane.jpg", pos=(0.72, 0.45)))
made.append(card("market", "Market Intelligence", "Original Hamptons research and village reports.", eyebrow="Research", image="/images/33-lily-pond-lane-dusk.jpg", pos=(0.6, 0.5)))
made.append(card("press", "In the Headlines", "Barry McGovern and Hedgerow Exclusive Properties in the press.", eyebrow="Press"))
made.append(card("contact", "A conversation, in confidence.", "646.339.0154 · barry@hedgerowexclusive.com", eyebrow="Contact", image="/images/barry-mcgovern.jpg", portrait=True))

areas = parse("src/lib/areas.ts", ["name", "slug", "tagline", "heroImage"], "export const areas")
area_slugs = []
for a in areas:
    card(f"village/{a['slug']}", a["name"], a.get("tagline"), eyebrow=f"{a['name']} real estate", image=a.get("heroImage"))
    area_slugs.append(a["slug"])

blog_src = open(os.path.join(ROOT, "src/lib/blog.ts")).read()
seo_titles = dict(re.findall(r'^\s*"([a-z0-9-]+)": "([^"]+) \| Barry McGovern",$', blog_src, re.M))
posts = parse("src/lib/blog.ts", ["slug", "title", "category", "image"], "export const blogPosts")
post_slugs = []
for p in posts:
    title = p["title"] if len(p["title"]) <= 70 else seo_titles.get(p["slug"], p["title"])
    card(f"blog/{p['slug']}", title, None, eyebrow=p.get("category", "Market research"), image=p.get("image") or "/images/barry-mcgovern-2.jpg")
    post_slugs.append(p["slug"])

with open(os.path.join(ROOT, "src/lib/og-images.ts"), "w") as f:
    f.write("// Generated by scripts/generate-og.py. Branded 1200x630 share cards in public/og/.\n")
    f.write("export const OG_PAGES = " + repr(made).replace("'", '"') + " as const;\n")
    f.write("export const OG_VILLAGES: readonly string[] = " + repr(area_slugs).replace("'", '"') + ";\n")
    f.write("export const OG_POSTS: readonly string[] = " + repr(post_slugs).replace("'", '"') + ";\n")
print(len(made), "pages,", len(area_slugs), "villages,", len(post_slugs), "posts")
