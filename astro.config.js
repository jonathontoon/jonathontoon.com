import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathontoon.com",
  output: "static",
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
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date()
    }),
    robotsTxt({
      sitemap: true
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true
    })
  ],
  image: {
    domains: ["jonathontoon.com", "www.jonathontoon.com"]
  }
});
