const fs = require("fs");
const path = require("path");

const components = [
  "Button",
  "Calendar",
  "Checkbox",
  "CheckboxList",
  "DatePicker",
  "DateRangePicker",
  "ProductInfo",
  "Dropdown",
  "Favorite",
  "Icon",
  "IconText",
  "Image",
  "Input",
  "Link",
  "RangePicker",
  "Rating",
  "Step2",
  "Steps",
  "Switcher",
  "Table",
  "Tags",
  "Text",
];
components.forEach((name) => {
  const src = path.resolve(
    __dirname,
    `src/components/${name}/dist/${name.toLowerCase()}.es.js`
  );
  const dest = path.resolve(
    __dirname,
    `build/static/js/components/${name.toLowerCase()}.es.js`
  );
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`📦 Copied ${src} → ${dest}`);
});
