const { execSync } = require('child_process');

try {
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

    console.log('\nBuild complete!');
} catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
}
