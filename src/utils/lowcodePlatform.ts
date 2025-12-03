import { ComponentRegistry } from './componentRegistry';
import { platformApi } from './platformApi';
import { All } from '../allComponents'; // map that holds registered components

export const LowcodePlatform = {
    /** Internal ready state and callbacks */
    _ready: false as boolean,
    _readyCallbacks: [] as Array<() => void>,

    /** Register a component factory (module must export `createComponent`). */
    registerComponent(name: string, module: any) {
        if (!module?.createComponent) {
            console.warn(`[LowcodePlatform] Module for ${name} does not export createComponent`);
            return;
        }
        // Register factory with the internal ComponentRegistry
        ComponentRegistry.register(name, module.createComponent, { name });
        // Initialise the component using the platform API (DI)
        const ok = ComponentRegistry.initializeComponent(name, platformApi);
        if (!ok) {
            console.error(`[LowcodePlatform] Failed to initialise component ${name}`);
            return;
        }
        const comp = ComponentRegistry.get(name);
        if (!comp) {
            console.error(`[LowcodePlatform] Component ${name} not found after init`);
            return;
        }
        // Add to the global All map used by the rest of the app
        (All as any)[name] = comp;
        console.log(`[LowcodePlatform] ✅ Registered component "${name}"`);
    },

    /** Load a built ES module and register it. */
    async loadAndRegister(name: string, url: string) {
        try {
            const mod = await import(/* @vite-ignore */ url);
            this.registerComponent(name, mod);
        } catch (err) {
            console.error(`[LowcodePlatform] Failed to load ${name} from ${url}:`, err);
        }
    },
    /** Convenience – load many components at once. */
    async loadMany(map: Record<string, string>) {
        await Promise.all(
            Object.entries(map).map(([name, url]) => this.loadAndRegister(name, url))
        );
    },

    /** Register a callback to be invoked when LowcodePlatform is ready. */
    onReady(callback: () => void) {
        if (this._ready) {
            // Already ready – invoke immediately (async to avoid sync surprises)
            setTimeout(callback, 0);
        } else {
            this._readyCallbacks.push(callback);
        }
    },

    /** Internal method to mark the platform as ready and flush callbacks. */
    _setReady() {
        this._ready = true;
        this._readyCallbacks.forEach(cb => setTimeout(cb, 0));
        this._readyCallbacks = [];
    }
};


/**
 * Global object that external scripts (dev imports or built ES modules) can use to
 * register a component with the Low‑Code platform.
 *
 * Development usage (source import):
 *   import * as ButtonModule from './components/Button/src/index';
 *   LowcodePlatform.registerComponent('Button', ButtonModule);
 *
 * Production usage (after loading a built bundle via <script type="module" src="...">):
 *   // the bundle will export `createComponent`
 *   LowcodePlatform.loadAndRegister('Button', './static/js/components/button.es.js');
 */
// export const LowcodePlatform = {
//     /** Register a component factory (module must export `createComponent`). */
//     registerComponent(name: string, module: any) {
//         if (!module?.createComponent) {
//             console.warn(`[LowcodePlatform] Module for ${name} does not export createComponent`);
//             return;
//         }
//         // Register factory with the internal ComponentRegistry
//         ComponentRegistry.register(name, module.createComponent, { name });
//         // Initialise the component using the platform API (DI)
//         const ok = ComponentRegistry.initializeComponent(name, platformApi);
//         if (!ok) {
//             console.error(`[LowcodePlatform] Failed to initialise component ${name}`);
//             return;
//         }
//         const comp = ComponentRegistry.get(name);
//         if (!comp) {
//             console.error(`[LowcodePlatform] Component ${name} not found after init`);
//             return;
//         }
//         // Add to the global All map used by the rest of the app
//         (All as any)[name] = comp;
//         console.log(`[LowcodePlatform] ✅ Registered component "${name}"`);
//     },

//     /** Load a built ES module and register it. */
//     async loadAndRegister(name: string, url: string) {
//         try {
//             const mod = await import(/* @vite-ignore */ url);
//             this.registerComponent(name, mod);
//         } catch (err) {
//             console.error(`[LowcodePlatform] Failed to load ${name} from ${url}:`, err);
//         }
//     },
//     /** Convenience – load many components at once. */
//     async loadMany(map: Record<string, string>) {
//         await Promise.all(
//             Object.entries(map).map(([name, url]) => this.loadAndRegister(name, url))
//         );
//     },
// };

// Expose globally so external scripts can call it.
declare global {
    interface Window {
        LowcodePlatform: typeof LowcodePlatform;
    }
}
if (typeof window !== 'undefined') {
    window.LowcodePlatform = LowcodePlatform;
    window.dispatchEvent(new Event("lowcode-platform-ready"));
}
