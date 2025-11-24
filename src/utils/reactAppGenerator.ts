import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface ReactAppStructure {
  [filePath: string]: string;
}

const createComponentFile = (componentType: string): string => {
  return `import React from 'react';
import { Button } from 'antd';

// This is a placeholder for the ${componentType} component
// You'll need to copy the actual implementation from your LowCode Studio project

const ${componentType} = ({ properties, meta, grid, _mode, ...props }) => {
  // Basic styling from grid properties
  const style = {
    position: grid?.position || 'relative',
    left: grid?.left || 'auto',
    top: grid?.top || 'auto',
    width: grid?.width || 'auto',
    height: grid?.height || 'auto',
    zIndex: grid?.zIndex || 'auto',
    ...properties?.style,
  };

  return (
    <div 
      style={style} 
      className={\`component-\${componentType.toLowerCase()}\`}
      {...props}
    >
      {/* Replace this with your actual ${componentType} implementation */}
      <div style={{ 
        border: '1px dashed #ccc', 
        padding: '10px', 
        textAlign: 'center',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        ${componentType} Component
        {properties?.text && <span>: {properties.text}</span>}
        {properties?.label && <span>: {properties.label}</span>}
      </div>
    </div>
  );
};

export default ${componentType};
`;
};

export const generateReactApp = (screens: any[]): ReactAppStructure => {
  // Get all used components from screens
  const usedComponents = new Set<string>();
  
  screens.forEach(screen => {
    if (screen.elements) {
      screen.elements.forEach((element: any) => {
        usedComponents.add(element.cmpType);
      });
    }
  });

  // Generate package.json
  const packageJson = {
    name: "lowcode-studio-app",
    version: "1.0.0",
    private: true,
    dependencies: {
      "@testing-library/jest-dom": "^5.16.4",
      "@testing-library/react": "^13.3.0",
      "@testing-library/user-event": "^13.5.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      "react-icons": "^4.8.0",
      "@ant-design/icons": "^5.0.0",
      "antd": "^5.0.0",
      "echarts": "^5.4.0",
      "echarts-for-react": "^3.0.2",
      "react-router-dom": "^6.8.0",
      "web-vitals": "^2.1.4",
      "cuid": "^2.1.8"
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test",
      eject: "react-scripts eject"
    },
    eslintConfig: {
      extends: [
        "react-app",
        "react-app/jest"
      ]
    },
    browserslist: {
      production: [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      development: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  };

  // Generate README.md
  const readmeContent = `# LowCode Studio Generated App

This React application was generated from LowCode Studio.

## Getting Started

1. Navigate to the project directory
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

- \`src/components/\` - UI components (generated placeholders - replace with actual implementations)
- \`src/context/\` - Application context and state management
- \`src/Preview/\` - Preview components
- \`src/data/\` - Application data and screens configuration

## Available Scripts

- \`npm start\` - Runs the app in development mode
- \`npm run build\` - Builds the app for production  
- \`npm test\` - Launches the test runner

## Next Steps

1. Replace placeholder components in \`src/components/\` with actual implementations from LowCode Studio
2. Copy any additional utilities, hooks, or services from your LowCode Studio project
3. Update styling and theme configurations as needed

## Features

- ✅ Complete React app structure
- ✅ Component-based architecture
- ✅ Context-based state management
- ✅ ECharts integration ready
- ✅ Ant Design components
- ✅ Responsive design ready

## Built with LowCode Studio

Visit [LowCode Studio](https://lowcodestudio.com) to create your own no-code applications.
`;

  // Generate basic App.js
  const appContent = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComponentContextProvider } from './context/componentContext';
import PreviewApp from './Preview/PreviewApp';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ComponentContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PreviewApp />} />
            <Route path="/screen/:screenId" element={<PreviewApp />} />
          </Routes>
        </div>
      </Router>
    </ComponentContextProvider>
  );
}

export default App;
`;

  // Generate component context
  const componentContextContent = `import React, { createContext, useContext, useState } from 'react';
import { screens as initialScreens } from '../data/screens';

const ComponentContext = createContext();

export const ComponentContextProvider = ({ children }) => {
  const [screens, setScreens] = useState(initialScreens);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const selectScreen = (index) => {
    setSelectedScreenIndex(index);
  };

  const value = {
    screens,
    setScreens,
    selectedScreenIndex,
    selectScreen,
  };

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponentContext must be used within ComponentContextProvider');
  }
  return context;
};
`;

  // Generate Preview App component
  const previewAppContent = `import React from 'react';
import { useComponentContext } from '../context/componentContext';
import { useParams } from 'react-router-dom';
// Import all components
${Array.from(usedComponents).map(comp => 
    `import ${comp} from '../components/${comp}';`
  ).join('\n')}

const componentMap = {
${Array.from(usedComponents).map(comp => 
    `  ${comp},`
  ).join('\n')}
};

const PreviewApp = () => {
  const { screens, selectedScreenIndex } = useComponentContext();
  const { screenId } = useParams();
  
  const currentScreen = screenId 
    ? screens.find(s => s.id === screenId) 
    : screens[selectedScreenIndex];

  if (!currentScreen) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Screen not found</div>;
  }

  const renderElement = (element) => {
    const Component = componentMap[element.cmpType];
    if (!Component) {
      console.warn(\`Component \${element.cmpType} not found\`);
      return (
        <div key={element.id} style={{ 
          border: '1px solid red', 
          padding: '10px', 
          margin: '5px',
          backgroundColor: '#ffe6e6'
        }}>
          Component \${element.cmpType} not found - please implement it
        </div>
      );
    }

    return (
      <Component
        key={element.id}
        id={element.id}
        properties={element.properties}
        meta={element.meta}
        grid={element.grid}
        _mode="preview"
      />
    );
  };

  return (
    <div className="preview-container" style={{ 
      width: '100%', 
      minHeight: '100vh',
      backgroundColor: currentScreen.properties?.backgroundColor || '#ffffff',
      position: 'relative'
    }}>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <h2>Screen: {currentScreen.name || 'Untitled'}</h2>
        <p>Generated by LowCode Studio</p>
      </div>
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 100px)' }}>
        {currentScreen.elements && currentScreen.elements.length > 0 ? 
          currentScreen.elements.map(renderElement) : 
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No elements in this screen
          </div>
        }
      </div>
    </div>
  );
};

export default PreviewApp;
`;

  // Generate screens data
  const screensData = `// Generated by LowCode Studio
export const screens = ${JSON.stringify(screens, null, 2)};
`;

  // Create the complete structure
  const structure: ReactAppStructure = {
    // Root files
    'package.json': JSON.stringify(packageJson, null, 2),
    'README.md': readmeContent,
    '.gitignore': `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`,
    
    // Source files
    'src/App.js': appContent,
    'src/App.css': `/* Generated by LowCode Studio */
.App {
  min-height: 100vh;
}

.preview-container {
  position: relative;
}

/* Component base styles */
[class*="component-"] {
  box-sizing: border-box;
}

/* Add any additional styles your components need */
.component-button {
  cursor: pointer;
}

.component-input input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.component-text {
  word-wrap: break-word;
}
`,
    'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
    'src/index.css': `/* Generated by LowCode Studio */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}
`,
    
    // Context
    'src/context/componentContext.js': componentContextContent,
    
    // Data
    'src/data/screens.js': screensData,
    
    // Preview
    'src/Preview/PreviewApp.js': previewAppContent,
    
    // Public files
    'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Generated by LowCode Studio" />
    <title>LowCode Studio App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`,
    'public/manifest.json': `{
  "short_name": "LowCode App",
  "name": "LowCode Studio Generated App",
  "icons": [],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
`,
    'public/robots.txt': `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
`,
  };

  // Add component files for all used components
  Array.from(usedComponents).forEach(componentType => {
    structure[`src/components/${componentType}/index.js`] = createComponentFile(componentType);
  });

  return structure;
};

export const downloadReactAppPackage = async (screens: any[]) => {
  try {
    const zip = new JSZip();
    const appStructure = generateReactApp(screens);
    
    // Add all files to the zip
    Object.keys(appStructure).forEach(filePath => {
      zip.file(filePath, appStructure[filePath]);
    });
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `lowcode-studio-react-app-${timestamp}.zip`;
    
    // Download the file
    saveAs(content, filename);
    
    // Show success message
    const message = `
🚀 React App Downloaded Successfully!

📦 File: ${filename}

SETUP INSTRUCTIONS:
1. Extract the downloaded zip file
2. Navigate to the extracted folder
3. Run: npm install
4. Run: npm start
5. Open: http://localhost:3000

📁 What's included:
✅ Complete React application structure
✅ All your screens and data
✅ Placeholder components (need actual implementation)
✅ Context management
✅ Routing setup
✅ Package.json with all dependencies

📝 Next steps:
- Replace placeholder components with actual implementations from LowCode Studio
- Copy any additional utilities, hooks, or services you need
- Customize styling and themes

The app is ready to run with placeholder components!
    `;
    
    alert(message);
    
  } catch (error) {
    console.error('Error generating React app:', error);
    alert('Error generating React app. Please try again.');
  }
};