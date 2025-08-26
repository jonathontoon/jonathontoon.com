import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      iconDir: "public/images/icons"
    }),
    tailwind(),
    mdx(),
    compress()
  ]
});
