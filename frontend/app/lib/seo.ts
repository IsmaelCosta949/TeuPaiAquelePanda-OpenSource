import { TOOLS, getTool, toolPath } from "./tools";
import { getToolContent } from "./toolContent";

const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = "Teu Pai, Aquele Panda";
// Logo horizontal (677x369, ~1.83:1) — proporção próxima à do cartão grande
// (1.91:1). Uma arte dedicada de 1200x630 deixaria a prévia ainda melhor.
const OG_IMAGE = `${SITE_URL}/teupaiaquelepanda_logo.png`;
const OG_IMAGE_WIDTH = "677";
const OG_IMAGE_HEIGHT = "369";
const OG_IMAGE_ALT = "Panda segurando uma placa com o texto “Teu Pai, Aquele Panda”";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function buildPageMeta({
  title,
  description,
  path,
  noindex = false,
}: PageMetaOptions) {
  const url = `${SITE_URL}${path}`;

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
    { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    { tagName: "link", rel: "canonical", href: url },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

export function buildToolJsonLd(slug: string) {
  const tool = getTool(slug);
  const content = getToolContent(slug);
  const url = `${SITE_URL}${toolPath(slug)}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebApplication",
      name: tool.name,
      url,
      description: tool.seoDescription,
      applicationCategory:
        tool.category === "dev" || tool.category === "documentos"
          ? "DeveloperApplication"
          : "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      inLanguage: "pt-BR",
      image: OG_IMAGE,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        { "@type": "ListItem", position: 2, name: tool.name, item: url },
      ],
    },
  ];

  if (content?.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "script:ld+json": { "@context": "https://schema.org", "@graph": graph },
  };
}

export function buildToolMeta(slug: string) {
  const tool = getTool(slug);
  return [
    ...buildPageMeta({
      title: tool.seoTitle,
      description: tool.seoDescription,
      path: toolPath(slug),
    }),
    buildToolJsonLd(slug),
  ];
}

export function buildSiteJsonLd() {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "pt-BR",
        },
        {
          "@type": "ItemList",
          name: "Ferramentas",
          itemListElement: TOOLS.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${SITE_URL}${toolPath(tool.slug)}`,
          })),
        },
      ],
    },
  };
}
