import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
const required = [
  "/about",
  "/sales",
  "/market",
  "/press",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
];

const missing = required.filter((path) => !src.includes(path));
if (missing.length) {
  console.error("sitemap smoke failed; missing paths:", missing.join(", "));
  process.exit(1);
}

console.log("sitemap smoke ok:", required.join(", "));
