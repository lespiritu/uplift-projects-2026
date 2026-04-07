import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://p5-backend-restaurant-api.onrender.com",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
