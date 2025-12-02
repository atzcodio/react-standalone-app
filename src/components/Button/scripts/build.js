const { execSync } = require('child_process');

console.log('Building unminified version...');
execSync('npx vite build', {
    stdio: 'inherit',
    env: { ...process.env, BUILD_TYPE: 'unminified' }
});

console.log('\nBuilding minified version...');
execSync('npx vite build', {
    stdio: 'inherit',
    env: { ...process.env, BUILD_TYPE: 'minified' }
});
