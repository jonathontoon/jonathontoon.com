import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathontoon.com",
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    icon({
      iconDir: "public/images/icons"
    }),
    tailwind(),
  ],
  image: {
    domains: ["jonathontoon.com", "www.jonathontoon.com"]
  }
});
