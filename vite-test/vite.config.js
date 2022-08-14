import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import visualizer from "rollup-plugin-visualizer";
export default defineConfig({
    base: '/test/',
    plugins: [
        vue(),
        {
            ...visualizer(),
            enforce: 'pre',
            apply: 'build'
        },
    ],
});