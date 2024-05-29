import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  integrations: [
    icon({
      iconDir: "src/assets/svgs"
    }),
    tailwind(),
    compress()
  ]
});
