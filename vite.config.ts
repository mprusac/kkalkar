import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const LOVABLE_ASSET_BASE = "https://kkposusje-digital-court.lovable.app";

const absoluteLovableAssets = () => ({
  name: "absolute-lovable-asset-json",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const filePath = id.split("?")[0];
    if (!filePath.endsWith(".asset.json")) return null;

    const asset = JSON.parse(code);
    if (typeof asset.url === "string" && asset.url.startsWith("/__l5e/assets-v1/")) {
      asset.url = `${LOVABLE_ASSET_BASE}${asset.url}`;
    }

    return JSON.stringify(asset);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [absoluteLovableAssets(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion": ["framer-motion"],
          "query": ["@tanstack/react-query"],
          "radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-popover",
          ],
          "supabase": ["@supabase/supabase-js"],
        },
      },
    },
  },
}));
