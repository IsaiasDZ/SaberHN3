import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Configuración específica de TanStack Start
  tanstackStart: {
    server: { entry: "server" },
    importProtection: {
      behavior: "error",
      client: {
        files: ["**/server/**"],
        specifiers: ["server-only"],
      },
    },
  },

  // Configuración nativa de Vite que hereda y complementa a Lovable
  vite: {
    server: {
      host: "::",
      port: 8080,
    },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
      tsconfigPaths: true,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    css: { 
      transformer: "lightningcss" 
    },

    // Configuración de Nitro para solucionar el despliegue y Tailwind en Railway con Bun
    nitro: {
      preset: "bun",
      serveStatic: true,
    },
  },
});
