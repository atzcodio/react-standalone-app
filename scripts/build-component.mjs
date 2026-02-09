// import esbuild from "esbuild";
// import { performance } from "node:perf_hooks";
// import fs from "fs";
// import path from "path";

// const start = performance.now();
// const component = process.argv[2];

// if (!component) {
//   console.error("❌ Component name required");
//   process.exit(1);
// }

// const componentDir = path.resolve(`src/components/${component}`);
// const entryFile = path.join(componentDir, "index.tsx");
// const tempIndex = path.join(componentDir, "index.temp.ts");

// // --------------------------------------------------
// // Step 1: Generate temporary index.ts if missing
// // --------------------------------------------------
// let useEntry = entryFile;

// if (!fs.existsSync(path.join(componentDir, "index.ts"))) {
//   console.log(`[${component}] Creating temporary index.ts`);
//   fs.writeFileSync(
//     tempIndex,
//     `
// import { createComponent } from './index.tsx';
// export { createComponent };
// `,
//     "utf8"
//   );
//   useEntry = tempIndex;
// }

// // Ensure output dir exists
// const outDir = path.join(componentDir, "dist");
// if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// // --------------------------------------------------
// // Step 2: Build with esbuild (HARDENED RUNTIME MODE)
// // --------------------------------------------------
// try {
//   await esbuild.build({
//     entryPoints: [useEntry],
//     outfile: path.join(outDir, `${component.toLowerCase()}.es.js`),

//     bundle: true,
//     format: "esm",
//     platform: "browser",
//     target: ["es2017"],

//     sourcemap: true,
//     minify: false,
//     treeShaking: true,

//     // 🔴 ABSOLUTE RULE: classic React runtime only
//     jsx: "transform",
//     jsxFactory: "React.createElement",
//     jsxFragment: "React.Fragment",

//     // 🔴 NEVER bundle or resolve React or JSX runtime
//     external: [
//       "react",
//       "react-dom",
//       "react/jsx-runtime"
//     ],

//     // 🔴 IMPORTANT:
//     // Do NOT allow tsconfig to re-enable react-jsx
//     tsconfigRaw: {
//       compilerOptions: {
//         jsx: "react"
//       }
//     },

//     loader: {
//       ".ts": "ts",
//       ".tsx": "tsx"
//     },

//     banner: {
//       js: `// Runtime plugin build — React is injected by platform`
//     },

//     // --------------------------------------------------
//     // 🔒 BUILD-TIME SAFETY GUARD
//     // --------------------------------------------------
//     plugins: [
//       {
//         name: "forbid-jsx-runtime",
//         setup(build) {
//           build.onEnd((result) => {
//             const outputFiles = Object.keys(result.metafile?.outputs || {});
//             for (const file of outputFiles) {
//               if (file.includes("jsx-runtime")) {
//                 throw new Error(
//                   "❌ INVALID BUILD: react/jsx-runtime detected. " +
//                   "Runtime plugins must use classic React runtime."
//                 );
//               }
//             }
//           });
//         }
//       }
//     ],

//     metafile: true
//   });

//   const end = performance.now();
//   console.log(
//     `✅ Built component: ${component}, Build time: ${(end - start).toFixed(2)} ms`
//   );
// } catch (err) {
//   console.error(`[${component}] Build failed:`, err);
//   process.exit(1);
// } finally {
//   if (fs.existsSync(tempIndex)) {
//     fs.unlinkSync(tempIndex);
//   }
// }


import esbuild from "esbuild";
import fs from "fs";
import path from "path";

const component = process.argv[2];

if (!component) {
  console.error("❌ Component name required");
  process.exit(1);
}

const componentDir = path.resolve(`src/components/${component}`);
const entry = path.join(componentDir, "index.tsx");
const outDir = path.join(componentDir, "dist");

if (!fs.existsSync(entry)) {
  console.error(`❌ Entry not found: ${entry}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [entry],
  outfile: path.join(outDir, `${component}.js`),

  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2017",

  // ✅ JSX → React.createElement (classic runtime)
  jsx: "transform",
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",

  // ✅ Platform provides these
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "antd",
    "@mui/*",
    "react-router-dom"
  ],

  sourcemap: true,
  treeShaking: true,
  minify: false
});

console.log(`✅ Built ${component}`);
