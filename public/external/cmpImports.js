import cmpList from "./cmpList.js";
async function loadComponents() {
  // Base URL relative to this file (cmpImports.js)
  const base = new URL("../static/js/components/", import.meta.url);
  for (const { name, file } of cmpList) {
    try {
      const module = await import(new URL(file, base));
      window.LowcodePlatform.registerComponent(name, module);
      console.log(`Loaded component: ${name}`);
    } catch (err) {
      console.error(`Failed to load ${name} from ${file}`, err);
    }
  }
}

// Start loading
loadComponents();