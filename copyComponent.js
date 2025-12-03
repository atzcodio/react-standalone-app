const fs = require('fs');
const path = require('path');

const components = ['Button', 'ProductInfo'];
components.forEach(name => {
    const src = path.resolve(__dirname, `src/components/${name}/dist/${name.toLowerCase()}.es.js`);
    const dest = path.resolve(__dirname, `build/static/js/components/${name.toLowerCase()}.es.js`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`📦 Copied ${src} → ${dest}`);
});