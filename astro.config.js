import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathontoon.com",
  output: "static",
  adapter: cloudflare({
    imageService: 'compile'
  }),
  integrations: [
   icon({
      iconDir: "public/images/icons"
    }),
    tailwind(),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
    domains: ["jonathontoon.com", "www.jonathontoon.com"],
    formats: ["webp", "avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.jonathontoon.com"
      }
    ]
  }
});
