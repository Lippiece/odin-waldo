// eslint-disable-next-line
/// <reference types="vitest" />
// eslint-disable-next-line
/// <reference types="vite/client" />

import { resolve }            from "node:path"

import react                  from "@vitejs/plugin-react-swc"
import { defineConfig }       from "vite"
import viteCompression        from "vite-plugin-compression"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

// https://vitejs.dev/config/
export default defineConfig(
  {
    base   : "/odin-waldo/",
    build  : {
      rollupOptions: {
        input: {
          main    : resolve( __dirname,
                             "index.html" ),
          notFound: resolve( __dirname, "404.html" ),
        },
      },
    },
    plugins: [ react(),
               viteCompression(),
               ViteImageOptimizer() ],
    test   : {
      clearMocks : true,
      environment: "jsdom",
      globals    : true,
      update     : true,
    },
  } )
