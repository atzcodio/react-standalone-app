// vite-plugin-lowcode-inject.js
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default function lowcodeInject(options = {}) {
  return {
    name: 'vite-plugin-lowcode-inject',
    writeBundle() {
      const htmlPath = path.resolve(process.cwd(), 'build/index.html');
      let html = readFileSync(htmlPath, 'utf-8');

      console.log("running lowcodeInject...", html);

      // Inject into <head>
      html = html.replace(
        '</title>',
        `</title>\n    <script type="importmap">\n      {\n        "imports": {\n          "react": "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm",\n          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm"\n        }\n      }\n    </script>\n    <script>\n      window.addEventListener("lowcode-platform-ready", () => {\n        console.log("Lowcode platform ready", window.ButtonCmp, window.ProductCmp);\n      });\n    </script>`
      );

      // Inject into <body> before </body>
      html = html.replace(
        '</body>',
        `  <script type="module">\n      import * as ProductCmp from '/components/productinfo.es.js';\n      window.LowcodePlatform.registerComponent("ProductInfo", ProductCmp);\n    </script>\n</body>`
      );

      writeFileSync(htmlPath, html, 'utf-8');
    }
  };
}

// Usage in vite.config.js:
// import lowcodeInject from './vite-plugin-lowcode-inject';
// export default { plugins: [lowcodeInject()] };
