interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_CF_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
