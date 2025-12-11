const react = require('@vitejs/plugin-react');
const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic',
        })
    ],
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    esbuild: {
        jsxFactory: 'api.React.createElement',
        jsxFragment: 'api.React.Fragment',
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'umd'],
            name: 'ImageComponent',
            fileName: (format) => `image.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
