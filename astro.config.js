import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "always",
  integrations: [
    icon({
      iconDir: "src/assets/svgs"
    }),
    tailwind(),
    compress()
  ]
});
