import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  async prerender() {
    return ["/", "/suporte", "/termos", "/for-devs"];
  },
} satisfies Config;
