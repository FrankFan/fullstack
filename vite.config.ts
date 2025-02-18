import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace.default({
      preventAssignment: true,
      __SYSTEM_TAG__: getCurrentDate(),
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear(); //  年份，四位数字
  const month = now.getMonth() + 1; //  月份，从 0 开始计数，需要加上 1
  const day = now.getDate(); //  日期，从 1 开始计数
  const hour = now.getHours(); //  小时，24 小时制
  const minute = now.getMinutes(); //  分钟
  const second = now.getSeconds(); //  秒钟

  // 使用模板字符串格式化日期字符串
  const dateString = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  return dateString;
}
