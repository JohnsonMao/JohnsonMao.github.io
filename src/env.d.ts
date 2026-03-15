/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string
  readonly PUBLIC_CLARITY_ID?: string
  readonly PUBLIC_CLOUDFLARE_BEACON_TOKEN?: string
  readonly PUBLIC_GISCUS_REPO?: string
  readonly PUBLIC_GISCUS_REPO_ID?: string
  readonly PUBLIC_GISCUS_CATEGORY?: string
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string
  readonly PUBLIC_VAPID_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
