import esbuild from "esbuild";
import fs from "fs";

const outDir = "public/static/js/react";
fs.mkdirSync(outDir, { recursive: true });

// React core
await esbuild.build({
  entryPoints: ["react"],
  outfile: `${outDir}/react.esm.js`,
  bundle: true,
  format: "esm",
  platform: "browser",
  define: {
    "process.env.NODE_ENV": '"production"'
  },
});

// JSX runtime (CRITICAL FIX)
await esbuild.build({
  entryPoints: ["react/jsx-runtime"],
  outfile: `${outDir}/jsx-runtime.esm.js`,
  bundle: true,
  format: "esm",
  platform: "browser",
  define: {
    "process.env.NODE_ENV": '"production"'
  },
  // 👇 VERY IMPORTANT
  treeShaking: false
});

// React DOM
await esbuild.build({
  entryPoints: ["react-dom/client"],
  outfile: `${outDir}/react-dom.esm.js`,
  bundle: true,
  format: "esm",
  platform: "browser",
  define: {
    "process.env.NODE_ENV": '"production"'
  },
});

console.log("✅ React ESM builds generated");
