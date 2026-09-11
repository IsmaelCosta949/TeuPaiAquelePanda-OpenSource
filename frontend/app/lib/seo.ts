const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = "Teu Pai, Aquele Panda";
const OG_IMAGE = `${SITE_URL}/teupaiaquelepanda_logo_trimmed.png`;

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
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
    { tagName: "link", rel: "canonical", href: url },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

// Structured data (schema.org) describing the tool itself for Google's rich
// results — invisible to users, only read by search engines. Only makes
// sense on the homepage, since it identifies the app as a whole.
export function buildAppJsonLd() {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Gerador de e-mail temporário e descartável, sem cadastro. Endereços expiram automaticamente após 1 hora.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      image: OG_IMAGE,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
    },
  };
}
