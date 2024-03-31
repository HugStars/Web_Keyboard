import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(async () => ({
    plugins: [vue()],
    clearScreen: false,
    server: {
        port: 8080,
        strictPort: true,
        watch: {
            ignored: ["**/src-tauri/**"],
        }
    }
}))
