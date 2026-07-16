import { site } from "../data/site.js";
import { services } from "../data/services.js";
import { areas } from "../data/areas.js";
export async function GET() {
  const urls = ["/", "/services/", "/pest-library/", "/about/", "/contact/", "/privacy-policy/",
    ...services.map((s) => `/${s.slug}/`), ...areas.map((a) => `/${a.slug}/`)];
  const now = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n") + `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
