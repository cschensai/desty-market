import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import visualizer from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envObj = loadEnv(mode, process.cwd());
  return {
    server: {
      port: 8080,
      host: "0.0.0.0",
      proxy: {
        "/platform-api": {
          target: "https://platform-gateway.desty.one",
          changeOrigin: true,
          secure: false,
          rewrite: url => url.replace(/^\/platform-api/, ""),
        }
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: { // here
            isCustomElement: tag => tag === 'lottie-player'
          }
        }
      }),
      createHtmlPlugin({
        inject: {
          data: {
            gaId: envObj.VITE_NODE_ENV === 'production' ? 'AW-988380298' : 'G-X5C10T6Q85',
          },
        },
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus(),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 执行icon name的格式
        symbolId: "icon-[dir]-[name]"
      }),
      // analyze bundle npm build会自动开发
      visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
      }),
      manualChunksPlugin(), // webpackChunkName
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              __dirname,
              "src/common/less/common.less"
            )}";`,
            javascriptEnabled: true
          }
        }
      }
    },
    build: {
      // 为了适配nginx上的处理
      // assetsDir: "template"
      cssCodeSplit: true,
      reportCompressedSize: false, // 关闭文件计算
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          comments: true, // 去掉注释内容
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: "market/[name].[hash][extname]",
          chunkFileNames: "market/[name].[hash].js",
          entryFileNames: "market/[name].[hash].js",
          // manualChunks: {
          //   // 'element-plus': ['element-plus'],
          //   'vue-i18n': ['vue-i18n'],
          //   'vue-router': ['vue-router'],
          //   'vuex': ['vuex'],
          //   'axios': ['axios'],
          //   'swiper': ['swiper'],
          //   'desty-design': ['desty-design'],
          //   'gsap': ['gsap'],
          // }
          manualChunks(id) {
            if (id.includes("node_modules")) {
                return id
                        .toString()
                        .split("node_modules/")[1]
                        .split("/")[0]
                        .toString();
            }
          }
        }
      }
    }
  }
});
