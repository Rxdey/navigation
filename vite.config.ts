import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      manifest: {
        "name": '开始吧🚀',
        "description": "是导航哦！🚀🚀🚀",
        "theme_color": "#000",
        icons: [
          {
            "src": "./logo.svg",
            "sizes": "192x192",
            "type": "image/svg+xml"
          },
          {
            "src": "./logo.svg",
            "sizes": "512x512",
            "type": "image/svg+xml"
          }
        ]
      },

      devOptions: {
        // 如果想在`vite dev`命令下调试PWA, 必须启用它
        enabled: true,
        // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
        type: "module"
      },
      registerType: 'autoUpdate'

    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  // 服务配置
  server: {
    port: 8770,
    host: '0.0.0.0',
    proxy: {
    }
  },
});
