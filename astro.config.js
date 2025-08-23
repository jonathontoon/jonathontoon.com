import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      iconDir: "public/svgs"
    }),
    tailwind(),
    compress()
  ]
});
