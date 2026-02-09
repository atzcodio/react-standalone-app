import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.resolve(__dirname, '../src/components');
const failedComponents = [];

const componentFolders = readdirSync(componentsDir).filter((name) => {
  const fullPath = path.join(componentsDir, name);
  return statSync(fullPath).isDirectory();
});

for (const component of componentFolders) {
  try {
    console.log(`Building component: ${component}`);
    execSync(`npm run build:component ${component}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to build: ${component}`);
    failedComponents.push(component);
  }
}

if (failedComponents.length > 0) {
  console.log('Failed components:');
  failedComponents.forEach((cmp) => console.log(`- ${cmp}`));
} else {
  console.log('All components built successfully!');
}
