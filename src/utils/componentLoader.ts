import React from 'react';
import { ComponentRegistry } from './componentRegistry';
import { platformApi } from './platformApi';

// Load a component from its build file
export async function loadComponent(
    componentName: string,
    buildFileUrl: string
): Promise<React.ComponentType<any> | null> {
    try {
        console.log(`Loading component: ${componentName} from ${buildFileUrl}`);

        // Convert the build file URL to a format that works with dynamic imports
        // For local files, we need to use a relative path from the src directory
        const modulePath = buildFileUrl.startsWith('/src/')
            ? buildFileUrl.replace('/src/', '../')
            : buildFileUrl;

        // Dynamically import the component module
        const module = await import(/* @vite-ignore */ modulePath);

        // Check if the module has a createComponent function (DI pattern)
        if (module.createComponent && typeof module.createComponent === 'function') {
            // Initialize the component with platform API
            const { component, manifest } = module.createComponent(platformApi);

            // Register the component
            ComponentRegistry.registerComponent(componentName, component, manifest);

            console.log(`✓ Successfully loaded component: ${componentName}`);
            return component;
        }

        // Fallback: check for default export
        if (module.default) {
            console.log(`✓ Loaded component (default export): ${componentName}`);
            ComponentRegistry.registerComponent(componentName, module.default);
            return module.default;
        }

        console.error(`Component ${componentName} does not export createComponent or default`);
        return null;
    } catch (error) {
        console.error(`Failed to load component ${componentName}:`, error);
        return null;
    }
}

// Load multiple components in parallel
export async function loadComponents(
    components: Array<{ name: string; buildFile: string }>
): Promise<Map<string, React.ComponentType<any>>> {
    const loadedComponents = new Map<string, React.ComponentType<any>>();

    // Load all components in parallel
    const loadPromises = components.map(async ({ name, buildFile }) => {
        const component = await loadComponent(name, buildFile);
        if (component) {
            loadedComponents.set(name, component);
        }
        return { name, component };
    });

    await Promise.all(loadPromises);

    return loadedComponents;
}

// Create a fallback component for failed loads
export function createFallbackComponent(componentName: string): React.ComponentType<any> {
    return function FallbackComponent(props: any) {
        return React.createElement(
            'div',
            {
                style: {
                    padding: '20px',
                    border: '2px dashed #ff4d4f',
                    borderRadius: '8px',
                    backgroundColor: '#fff2f0',
                    color: '#cf1322',
                    textAlign: 'center',
                    fontFamily: 'monospace'
                }
            },
            React.createElement('h3', { style: { margin: '0 0 10px 0' } }, '⚠️ Component Load Failed'),
            React.createElement('p', { style: { margin: '0' } }, `Component "${componentName}" could not be loaded.`),
            React.createElement('p', { style: { margin: '10px 0 0 0', fontSize: '12px', opacity: 0.7 } },
                'Check console for details.'
            )
        );
    };
}

// Initialize all components from manifest
export async function initializeComponentsFromManifest(
    manifest: { components: Array<{ name: string; buildFile: string; type: string }> }
): Promise<boolean> {
    console.log('🚀 Initializing components from manifest...');

    // Filter only dynamic components
    const dynamicComponents = manifest.components.filter(c => c.type === 'dynamic');

    if (dynamicComponents.length === 0) {
        console.log('No dynamic components to load');
        return true;
    }

    // Load all components
    const loadedComponents = await loadComponents(dynamicComponents);

    // Register fallback components for failed loads
    dynamicComponents.forEach(({ name }) => {
        if (!loadedComponents.has(name)) {
            console.warn(`Registering fallback for failed component: ${name}`);
            ComponentRegistry.registerComponent(name, createFallbackComponent(name));
        }
    });

    console.log(`✓ Loaded ${loadedComponents.size}/${dynamicComponents.length} components`);
    return loadedComponents.size > 0;
}
