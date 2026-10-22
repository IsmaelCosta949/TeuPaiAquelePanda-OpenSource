import { TOOLS, toolPath } from "../lib/tools";

const SITE_URL = import.meta.env.VITE_SITE_URL;

const PAGES = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  ...TOOLS.map((tool) => ({
    path: toolPath(tool.slug),
    changefreq: "monthly",
    priority: "0.8",
  })),
  { path: "/sobre/", changefreq: "yearly", priority: "0.5" },
  { path: "/suporte/", changefreq: "yearly", priority: "0.3" },
  { path: "/termos/", changefreq: "yearly", priority: "0.3" },
  { path: "/privacidade/", changefreq: "yearly", priority: "0.3" },
];

export function loader() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = PAGES.map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
