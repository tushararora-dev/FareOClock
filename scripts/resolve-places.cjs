// One-off: resolve all landmark photos (landscape, correct subject) + credits.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = process.argv[2];
const outDir = path.join(root, "public", "places");
const creditsPath = path.join(root, "lib", "place-credits.json");

const UA = "BudgetBandaSite/1.0 (https://budgetbanda.com; hello@budgetbanda.com)";
const api = "https://commons.wikimedia.org/w/api.php";

const targets = [
  { slug: "india", term: "Taj Mahal Agra", must: /taj\s*mahal/i },
  { slug: "nepal", term: "Boudhanath stupa Kathmandu", must: /boudha|bodhnath|bouddha/i },
  { slug: "uae", term: "Burj Khalifa Dubai", must: /burj\s*khalifa/i },
  { slug: "malaysia", term: "Petronas Towers Kuala Lumpur", must: /petronas/i },
  { slug: "singapore", term: "Marina Bay Sands Singapore", must: /marina\s*bay|singapore/i },
  { slug: "vietnam", term: "Ha Long Bay Vietnam", must: /ha\s*long|halong/i },
  { slug: "hongkong", term: "Victoria Harbour Hong Kong skyline", must: /victoria|hong\s*kong/i },
  { slug: "macau", term: "Senado Square Macau", must: /senado/i },
  { slug: "philippines", term: "Chocolate Hills Bohol", must: /chocolate\s*hills/i },
  { slug: "thailand", term: "Wat Arun Bangkok", must: /wat\s*arun/i },
];

const blocklist =
  /(map|plan|diagram|logo|chart|panorama|collage|montage|stamp|coin|banknote|portrait|crowd|protest|construction|drawing|painting|sketch|seal|flag|poster|screenshot|interior|room|night\s*view|fireworks)/i;

async function search(term, limit = 40) {
  const url = new URL(api);
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", String(limit));
  url.searchParams.set("gsrsearch", term);
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|extmetadata|size");
  url.searchParams.set("iiurlwidth", "1600");
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("search " + res.status);
  const json = await res.json();
  return json && json.query && json.query.pages ? Object.values(json.query.pages) : [];
}

function clean(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function score(p) {
  const info = p.imageinfo[0];
  const w = info.thumbwidth || info.width || 0;
  const h = info.thumbheight || info.height || 0;
  const ratio = h ? w / h : 1;
  let s = Math.min(ratio, 2.2) * 10;
  if (ratio < 1.05) s -= 60; // punish portrait
  s -= (p.index || 0) * 0.5;
  return s;
}

(async () => {
  const credits = [];
  for (const t of targets) {
    const attempts = [
      t.term + ' incategory:"Quality images"',
      t.term + ' incategory:"Featured pictures"',
      t.term,
    ];

    let best = null;
    for (const term of attempts) {
      let pages = [];
      try {
        pages = await search(term);
      } catch (e) {
        console.error("search failed", t.slug, e.message);
        continue;
      }
      const candidates = pages.filter((p) => {
        const info = p.imageinfo && p.imageinfo[0];
        if (!info || !info.thumburl) return false;
        if (!/^image\/jpeg/.test(info.mime || "")) return false;
        const title = String(p.title).replace(/^File:/, "");
        if (!t.must.test(title)) return false;
        if (blocklist.test(title)) return false;
        return true;
      });
      if (candidates.length) {
        candidates.sort((a, b) => score(b) - score(a));
        best = candidates[0];
        break;
      }
    }

    if (!best) {
      console.log("MISS " + t.slug);
      continue;
    }

    const info = best.imageinfo[0];
    const r = await fetch(info.thumburl, { headers: { "User-Agent": UA } });
    const raw = Buffer.from(await r.arrayBuffer());
    const jpeg = await sharp(raw)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer();

    fs.writeFileSync(path.join(outDir, t.slug + ".jpg"), jpeg);

    const meta = info.extmetadata || {};
    const out = await sharp(jpeg).metadata();
    credits.push({
      slug: t.slug,
      place: t.term,
      title: String(best.title).replace(/^File:/, ""),
      author: clean(meta.Artist && meta.Artist.value) || "Wikimedia Commons contributor",
      license: clean(meta.LicenseShortName && meta.LicenseShortName.value) || "See source",
      licenseUrl: clean(meta.LicenseUrl && meta.LicenseUrl.value) || "",
      source: info.descriptionurl || "",
      width: out.width,
      height: out.height,
    });

    console.log(
      "[" + t.slug + "] " + out.width + "x" + out.height + " " +
      Math.round(jpeg.length / 1024) + "KB | " +
      (clean(meta.LicenseShortName && meta.LicenseShortName.value) || "?") +
      " | " + best.title
    );
  }

  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2) + "\n");
  console.log("credits:", credits.length);
})();
