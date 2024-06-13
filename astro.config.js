import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import compress from "astro-compress";

import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  output: "server",
  trailingSlash: "always",
  integrations: [icon({
    iconDir: "src/assets/svgs"
  }), tailwind(), compress(), purgecss()],
  adapter: cloudflare()
});