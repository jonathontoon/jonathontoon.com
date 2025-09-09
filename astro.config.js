import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathontoon.com",
  output: "static",
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
