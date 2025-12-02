// Utility to extract unique component types from AppData
export function getComponentsFromAppData(appData: any): string[] {
    const componentTypes = new Set<string>();

    if (!appData || !appData.screens) {
        return [];
    }

    // Iterate through all screens
    appData.screens.forEach((screen: any) => {
        if (!screen.body || !Array.isArray(screen.body)) {
            return;
        }

        // Extract component types from screen body
        screen.body.forEach((component: any) => {
            if (component.type) {
                componentTypes.add(component.type);
            }
        });
    });

    return Array.from(componentTypes);
}

// Generate component manifest from AppData
export function generateComponentManifest(appData: any) {
    const componentTypes = getComponentsFromAppData(appData);

    const manifest = {
        components: componentTypes.map(type => ({
            name: type,
            buildFile: `/src/components/${type}/dist/${type.toLowerCase()}.es.js`,
            type: 'dynamic'
        }))
    };

    return manifest;
}
