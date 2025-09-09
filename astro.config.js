import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathontoon.com",
  output: "static",
  integrations: [
    umami({ id: "e1d957f7-6fdb-4665-885c-fd9ec7fa871a" }),
    icon({
      iconDir: "public/images/icons"
    }),
    tailwind(),
  ],
  image: {
    domains: ["jonathontoon.com", "www.jonathontoon.com"]
  }
});
