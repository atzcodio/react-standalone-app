import React from 'react';

// Component manifest interface
export interface ComponentManifest {
    name: string;
    EditProperties?: any;
    Configuration?: any;
    ThemeMapping?: any;
    defaultProps?: any;
}

// Component factory function type
export type ComponentFactory = (api: any) => {
    component: React.ComponentType<any>;
    manifest: ComponentManifest;
};

// Component registry class
class ComponentRegistryClass {
    private components: Map<string, React.ComponentType<any>> = new Map();
    private manifests: Map<string, ComponentManifest> = new Map();
    private factories: Map<string, ComponentFactory> = new Map();

    // Register a component with its factory and manifest
    register(
        name: string,
        factory: ComponentFactory,
        manifest: ComponentManifest
    ): void {
        this.factories.set(name, factory);
        this.manifests.set(name, manifest);
    }

    // Register a pre-initialized component
    registerComponent(
        name: string,
        component: React.ComponentType<any>,
        manifest?: ComponentManifest
    ): void {
        this.components.set(name, component);
        if (manifest) {
            this.manifests.set(name, manifest);
        }
    }

    // Get a component by name
    get(name: string): React.ComponentType<any> | null {
        return this.components.get(name) || null;
    }

    // Check if a component is registered
    has(name: string): boolean {
        return this.components.has(name);
    }

    // Get component manifest
    getManifest(name: string): ComponentManifest | null {
        return this.manifests.get(name) || null;
    }

    // Get all registered component names
    getComponentNames(): string[] {
        return Array.from(this.components.keys());
    }

    // Initialize a component from its factory
    initializeComponent(name: string, platformApi: any): boolean {
        const factory = this.factories.get(name);
        if (!factory) {
            console.warn(`No factory found for component: ${name}`);
            return false;
        }

        try {
            const { component, manifest } = factory(platformApi);
            this.components.set(name, component);
            this.manifests.set(name, manifest);
            return true;
        } catch (error) {
            console.error(`Failed to initialize component ${name}:`, error);
            return false;
        }
    }

    // Clear all registered components
    clear(): void {
        this.components.clear();
        this.manifests.clear();
        this.factories.clear();
    }
}

// Export singleton instance
export const ComponentRegistry = new ComponentRegistryClass();
