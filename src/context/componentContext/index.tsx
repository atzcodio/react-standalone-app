import { DragEndEvent } from "@dnd-kit/core";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  Key,
} from "react";
import {
  getComponentDefaultProps,
  getDefaultConfiguration,
  ComponentMap,
} from "./../../allComponents";
import { indexOf, LoDashStatic, throttle, update } from "lodash";
import _ from "lodash";

import { BaseConfiguration } from "../../baseComponent";
import { match } from "assert";
import FxStatesManager from "../../FormulaManager";
import { is } from "@react-spring/shared";

export interface Component {
  id: string;
  type: string;
  properties: any;
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
  grid: {
    desktop: {
      [y: string]: number;
      width: number;
      height: number;
    };
    mobile: {
      width: number;
      height: number;
      x?: number;
      y?: number;
    };
  };
  output?: string;
  _name: string;
  parentId?: string;
  onFxChange?: (
    componentId: string,
    propertyName: string,
    fxState: any
  ) => void;
  meta?: {};
}

interface ProviderProps {
  children: React.ReactNode;
  initialData?: {
    screens?: Screen[];
    queries?: Query[];
  };
}

export interface Screen {
  id: string;
  type: string;
  title?: string;
  body: Component[];
  properties?: Record<string, any>;
  propsList?: string[];
  editProperties?: Record<string, any>;
}

export interface Query {
  name: string;
  id: string;
  type: string;
  value: any;
  [key: string]: any;
}

export interface suggestionData {
  suggestions: string[];
  suggestionKeyDataTypes: Record<string, string>;
}

interface Listener {
  filters: string[];
  callback: (id: string, field: string, value: any) => void;
}
interface SidebarNavProps {
  screenId: string;
  position: string;
  heightOrWidth: string;
}
interface PopupNavProps {
  screenId: string;
  height: string;
  width: string;
}

interface HeaderNavProps {
  screenId: string;
  headerheight: string;
  position: string;
}

interface Context {
  interfaceView: string;
  setInterfaceView: (newView: string) => void;
  screens: Screen[];
  queries: Query[];
  propertySidebar: Boolean;
  leftSidebar: boolean;
  togglePropertySidebar: () => void;
  toggleLeftSidebar: () => void;
  setQueries: (queries: Query[]) => void;
  selectedScreenIndex: number;
  setSelectedScreenIndex: (index: number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  selectedComponent?: Component;
  setSelectedComponent: (selected: Component | undefined) => void;
  selectComponent: (selected: Component | undefined) => void;
  addComponent: (component: Component) => void;
  deleteComponent: () => void;
  duplicateComponent: () => void;
  updateProperties: (id: string, field: string, value: any) => void;
  updateMetaProperties: (id: string, field: string, fxState: any) => void;
  onFxChange: (componentId: string, propertyName: string, fxState: any) => void;
  updateGroupProperties: (id: string, fields: Record<string, any>) => void;
  updateScreenProperties: (id: string, field: string, value: any) => void;
  onPropertyUpdate: (name: string, field: string, value: any) => void;
  addScreen: (screenType: string) => void;
  updateComponentByName: (name: string, field: string, value: any) => void;
  selectScreen: (index: number) => void;
  deleteScreen: (index: number) => void;
  updateComponent: (component: Component) => void;
  evaluateFormula: (
    formula: string,
    taskData?: Record<string, any>,
    options?: Record<string, any>
  ) => string;
  triggerFormulaRecalculation: (
    type: 'component' | 'data',
    name: string,
    field?: string,
    options?: { oldName?: string; newName?: string }
  ) => void;
  initScreens: (screens: Screen[]) => void;
  getComponentSuggestions: () => suggestionData;
  getRepeatItemSuggestions: (childId: string) => suggestionData;
  getFromLocalStorage: () => Screen[];
  getQueriesFromLocalStorage: () => Query[];
  saveQueriesToLocalStorage: (queries: Query[]) => void;
  listener: (
    filters: string[],
    callback: (id: string, field: string, value: any) => void
  ) => void;
  getUsedComponents: (formula: string) => string[];
  setSidebar: (id: string) => void;
  setPopup: (id: string) => void;
  setHeader: (id: string) => void;
  selectedSidebarId: string;
  selectedPopupId: string;
  selectedHeaderId: string;
  onScreenChange: () => void;
  initandOpenSidebar: (
    screenId: string,
    position: string,
    heightOrWidth: string
  ) => void;
  sidebarNavState: SidebarNavProps;
  setSidebarNavState: (sidebarNav: SidebarNavProps) => void;
  initandOpenPopup: (screenId: string, height: string, width: string) => void;
  popupNavState: PopupNavProps;
  setPopupNavState: (sidebarNav: PopupNavProps) => void;
  initandOpenHeader: (
    screenId: string,
    headerheight: string,
    position: string
  ) => void;
  headerNavState: HeaderNavProps;
  setHeaderNavState: (sidebarNav: HeaderNavProps) => void;
}

const Context = createContext<Context | null>(null);

const DEVICES = {
  DESKTOP: "desktop",
  MOBILE: "mobile",
};

export const ComponentProvider = ({ children, initialData }: ProviderProps) => {
  const GRIDCOUNT = 24;
  const [screens, setScreens] = useState<Screen[]>(
    initialData?.screens && initialData.screens.length > 0 
      ? initialData.screens 
      : [{ id: "screen-1", type: "", body: [] }]
  );
  const [queries, setQueries] = useState<Query[]>(
    initialData?.queries || []
  );
  const [listeners, setListeners] = useState<Listener[]>([]);

  const fxStatesManager = FxStatesManager.getInstance();

  React.useEffect(() => {
    fxStatesManager.setOnFormulaUpdate(
      (componentId: string, propertyName: string, newValue: any) => {
        console.log(
          `FxStatesManager updating property: ${componentId}.${propertyName} = ${newValue}`
        );
        updateProperties(componentId, propertyName, newValue);
      }
    );

    initializeFxStatesFromComponents(screens);
  }, []);

  const initializeFxStatesFromComponents = (screens: Screen[]) => {
    console.log("🔄 Initializing FxStatesManager with existing formulas...");

    let formulaCount = 0;

    screens.forEach((screen) => {
      screen.body.forEach((component) => {
        fxStatesManager.setComponentMapping(component._name, component.id);

        if (component.meta) {
          Object.entries(component.meta).forEach(
            ([propertyName, fxState]: [string, any]) => {
              if (fxState && fxState.isFx && fxState.fx) {
                console.log(
                  `🔄 Found existing formula: ${component._name}.${propertyName} = ${fxState.fx}`
                );

                fxStatesManager.updateFormulaAndDependencies(
                  component._name,
                  propertyName,
                  fxState.fx
                );

                formulaCount++;
              }
            }
          );
        }
      });
    });

    if (formulaCount > 0) {
      fxStatesManager.regenerateAllReverseDependencies();
      console.log(`🔄 Initialized ${formulaCount} formulas and regenerated dependencies`);

      const debugInfo = fxStatesManager.getDependencyDebugInfo();
      console.log("🔄 FxStatesManager initialization complete:", debugInfo);

      (window as any).testFormulaExtraction = () => fxStatesManager.testDependencyExtraction();
      console.log("🧪 Test function added to window: testFormulaExtraction()");

      console.log("🔄 Starting initial formula evaluation...");
      setTimeout(() => {
        console.log("🔄 Processing initial evaluation queue with current queries:", queries.map(q => q.name));
        fxStatesManager.processEvaluationQueue(evaluateFormula);
      }, 300);
    }
  };

  const [propertySidebar, setPropertySidebar] = useState(true);
  const [leftSidebar, setLeftSidebar] = useState(true);
  const [interfaceView, setInterfaceView] = useState(DEVICES.MOBILE);
  const [screenType, setScreenType] = useState("");

  const [sidebarHeightWidth, setSidebarHeightWidth] = useState("400px");
  const [sidebarPosition, setSidebarPosition] = useState("");
  const [sidebarNavState, setSidebarNavState] = useState({
    screenId: "",
    position: "",
    heightOrWidth: "",
  });
  const [popupHeight, setPopupHeight] = useState("400px");
  const [popupWidth, setPopupWidth] = useState("400px");
  const [popupNavState, setPopupNavState] = useState({
    screenId: "",
    height: "",
    width: "",
  });
  const [headerHeight, setHeaderHeight] = useState("100px");
  const [headerNavState, setHeaderNavState] = useState({
    screenId: "",
    headerheight: "",
    position: "",
  });

  const onPropertyUpdate = (name: string, field: string, value: any) => {
    listeners.forEach((listener) => {
      if (
        listener.filters.includes(name) ||
        listener.filters.includes(`${name}.${field}`)
      ) {
        listener.callback(name, field, value);
      }
    });
  };

  const listener = (
    filters: string[],
    callback: (id: string, field: string, value: any) => void
  ) => {
    setListeners((prevListeners) => [...prevListeners, { filters, callback }]);
  };

  const initScreens = (screens: Screen[]) => {
    setScreens(screens);
    setTimeout(() => initializeFxStatesFromComponents(screens), 100);
  };

  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [selectedSidebarId, setSelectedSidebarId] = useState("");
  const [selectedPopupId, setSelectedPopupId] = useState("");
  const [selectedHeaderId, setSelectedHeaderId] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<Component | undefined>();

  const selectComponent = (component: Component | undefined) => {
    if (!component && !selectedComponent) {
      console.log("🎯 [selectComponent] Already no selection - skipping");
      return;
    }

    if (component && selectedComponent && component.id === selectedComponent.id) {
      console.log("🎯 [selectComponent] Same component already selected - skipping re-render");
      return;
    }

    console.log("🎯 [selectComponent] Selection changed:", {
      from: selectedComponent?.id || 'none',
      to: component?.id || 'none'
    });

    setSelectedComponent(component);
  };

  console.log("selectedScreenIndex changing context", selectedScreenIndex);

  const setSidebar = (id: string) => {
    console.log("sidebar context ID", id);
    const matchSidebar = screens.filter(
      (screen) => screen.id === id && screen.type === "sidebar"
    );
    if (matchSidebar.length > 0) {
      setSelectedSidebarId(matchSidebar[0].id);
      console.log("sidebar context ID2", matchSidebar);
      return matchSidebar[0].id;
    } else {
      setSelectedSidebarId("");
    }
  };

  const setPopup = (id: string) => {
    const matchPopup = screens.filter(
      (screen) => screen.id === id && screen.type === "popup"
    );
    if (matchPopup.length > 0) {
      setSelectedPopupId(matchPopup[0].id);
    } else {
      setSelectedPopupId("");
    }
  };

  const setHeader = (id: string) => {
    const matchHeader = screens.filter(
      (screen) => screen.id === id && screen.type === "header"
    );
    if (matchHeader.length > 0) {
      setSelectedHeaderId(matchHeader[0].id);
    } else {
      setSelectedHeaderId("");
    }
  };

  useEffect(() => {
    if (
      screens[selectedScreenIndex] &&
      screens[selectedScreenIndex]["type"] === "popup"
    ) {
      setPopup(screens[selectedScreenIndex]["id"]);
    } else {
      setPopup("");
    }

    if (
      screens[selectedScreenIndex] &&
      screens[selectedScreenIndex]["type"] === "sidebar"
    ) {
      setSidebar(screens[selectedScreenIndex]["id"]);
    } else {
      setSidebar("");
    }
    if (
      screens[selectedScreenIndex] &&
      screens[selectedScreenIndex]["type"] === "header"
    ) {
      setHeader(screens[selectedScreenIndex]["id"]);
    } else {
      setHeader("");
    }
  }, [selectedScreenIndex]);

  const onScreenChange = () => {
    const selectedScreen = screens[selectedScreenIndex];
    if (selectedScreen) {
      const { id, type } = selectedScreen;
      console.log("Selected Screen ID:", id);
      console.log("Selected Screen Type:", type);
      return { id, type };
    }
  };
  onScreenChange();

  const initandOpenSidebar = (
    screenId: string,
    position: string,
    heightOrWidth: string
  ) => {
    setSidebar(screenId);
    console.log("position &&", position, heightOrWidth);
    setSidebarPosition(position);

    if (position) {
      setSidebarHeightWidth(heightOrWidth);
    }
    setSidebarNavState({ screenId, position, heightOrWidth });
  };

  const initandOpenPopup = (
    screenId: string,
    height: string,
    width: string
  ) => {
    setPopup(screenId);
    setPopupHeight(height);
    setPopupWidth(width);
    setPopupNavState({ screenId, height, width });
  };

  const initandOpenHeader = (
    screenId: string,
    headerheight: string,
    position: string
  ) => {
    setHeader(screenId);
    setHeaderHeight(headerheight);
    setHeaderNavState({ screenId, headerheight, position });
  };

  const getFromLocalStorage = () => {
    var defaultScren = [
      {
        id: "screen-1",
        type: "screen",
        body: [],
      },
    ];
    const localScreens = localStorage.getItem("screens");
    let screenData = defaultScren;
    if (localScreens) {
      screenData =
        JSON.parse(localScreens).length > 0
          ? JSON.parse(localScreens)
          : defaultScren;
    }

    return screenData;
  };

  const saveToLocalStorage = (screen: Screen[]) => {
    var defaultScren = [
      {
        id: "screen-1",
        body: [],
      },
    ];

    let storeScreenData = getFromLocalStorage();

    if (screens && screens.length == 1 && screens[0].body) {
      if (screens[0].body.length > 0) {
        localStorage.setItem("screens", JSON.stringify(screens));
      } else {
        localStorage.setItem("screens", JSON.stringify(storeScreenData));
      }
    } else if (screens.length == 0) {
      localStorage.setItem("screens", JSON.stringify(storeScreenData));
    } else {
      localStorage.setItem("screens", JSON.stringify(screens));
    }
  };

  const saveQueriesToLocalStorage = (queries: Query[]) => {
    const localQueries = localStorage.getItem("queries");
    console.log("queries999", queries);
    if (localQueries && queries.length == 0) {
      const parsedQueries = JSON.parse(localQueries);
      console.log("parsedQueries");
      if (parsedQueries.length > 0) {
        queries = [...parsedQueries];
      }
    } else {
      queries = [...queries];
    }
    console.log("saving queries to local storage", queries);
    localStorage.setItem("queries", JSON.stringify(queries));
  };

  const getQueriesFromLocalStorage = () => {
    const localQueries = localStorage.getItem("queries");
    let queryData: Query[] = [];
    if (localQueries) {
      queryData =
        JSON.parse(localQueries).length > 0
          ? JSON.parse(localQueries)
          : queryData;
    }
    return queryData;
  };

  const throttledSaveToLocalStorage = throttle(saveToLocalStorage, 1000);
  const trottledSaveQueriesToLocalStorage = throttle(
    saveQueriesToLocalStorage,
    1000
  );

  useEffect(() => {
    throttledSaveToLocalStorage(screens);
    trottledSaveQueriesToLocalStorage(queries);
  }, [screens, queries]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    console.log("=== DRAG END START ===", { active, over, delta, screens });

    if (!delta || (Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5)) {
      console.log("=== DRAG END: NO SIGNIFICANT MOVEMENT (LIKELY A CLICK) ===");
      return;
    }

    if (over) {
      const overRect = over.rect;
      const activeTranslated = active.rect.current.translated || {
        left: 0,
        top: 0,
      };

      const scrollContainer = document.querySelector(".screen_panel");
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
      const scrollLeft = scrollContainer ? scrollContainer.scrollLeft : 0;

      let singleGridSize = overRect.width / GRIDCOUNT;
      let singleGridHeight = 10;

      let overreactLeft = overRect.left;

      const position = {
        x: activeTranslated.left + scrollLeft,
        y: activeTranslated.top + scrollTop,
      };

      const relativePosition = {
        x: position.x - overRect.left,
        y: position.y - overRect.top,
      };

      let gridxPositions = _.range(0, 11).map((x) => {
        return x * singleGridSize;
      });

      let minMatchedIndex = -1;
      let minMatchedValue = -1;
      for (let i = 0; i < gridxPositions.length; i++) {
        let currentMin = Math.abs(gridxPositions[i] - relativePosition.x);
        if (minMatchedValue == -1) {
          minMatchedValue = currentMin;
          minMatchedIndex = i;
        } else {
          if (currentMin < minMatchedValue) {
            minMatchedValue = currentMin;
            minMatchedIndex = i;
          }
        }
      }

      const finalPosition = {
        x:
          minMatchedIndex > -1
            ? gridxPositions[minMatchedIndex]
            : relativePosition.x,
        y: relativePosition.y,
      };

      let cmp = active.data.current as Component;

      let defaultProps = getComponentDefaultProps(cmp.type);
      console.log("defaultProps", defaultProps);
      let defaultConfiguration = getDefaultConfiguration(cmp.type);
      console.log("defaultConfiguration for", cmp.type, defaultConfiguration);
      delete defaultProps["type"];
      let width =
        defaultConfiguration.grid.desktop.width * singleGridSize || "auto";
      let height =
        defaultConfiguration.grid.desktop.height * singleGridHeight || "auto";

      console.log("Original grid config:", {
        desktop: defaultConfiguration.grid.desktop,
        mobile: defaultConfiguration.grid.mobile
      });

      const originalMobileGrid = { ...defaultConfiguration.grid.mobile };

      defaultConfiguration.grid.desktop.x = minMatchedIndex;
      defaultConfiguration.grid.desktop.y = Math.round(finalPosition.y / 10);

      defaultConfiguration.grid.mobile = {
        ...originalMobileGrid,
        x: minMatchedIndex,
        y: Math.round(finalPosition.y / 10)
      };

      console.log("Final grid config after position assignment:", {
        desktop: defaultConfiguration.grid.desktop,
        mobile: defaultConfiguration.grid.mobile
      });

      if (over.id != "drop-container") {
        let parentId = over.id.toString().split("container-")[1];
        cmp.parentId = parentId;
      }

      cmp._name = generateUniqueName(cmp.type);

      const setupDefaultFormulas = (componentType: string, componentName: string) => {
        try {
          const Component = ComponentMap[componentType];
          if (!Component) {
            console.warn(`Component ${componentType} not found in ComponentMap`);
            return;
          }

          const editProperties = (Component as any).EditProperties;
          const properties = _.extend(cmp.properties, defaultProps);
          if (editProperties && Array.isArray(editProperties)) {
            editProperties.forEach((group: any) => {
              if (group.elements) {
                group.elements.forEach((element: any) => {
                  let fx = element.hasOwnProperty("fx") ? element.fx : properties[element.name];
                  if (element.showFx && element.fx) {
                    if (!cmp.meta) cmp.meta = {};
                    (cmp.meta as any)[element.name] = {
                      isFx: true,
                      fx: fx
                    };

                    console.log(`Setting up default formula for ${componentName}.${element.name}: ${fx}`);

                    if (fxStatesManager) {
                      fxStatesManager.setComponentMapping(componentName, cmp.id);

                      fxStatesManager.setFxState(componentName, element.name, {
                        fx: fx,
                        isFx: true,
                        deps: fxStatesManager.extractDependencies(fx)
                      });
                    }
                  }
                });
              }
            });
          }
        } catch (error) {
          console.warn(`Could not setup default formulas for ${componentType}:`, error);
        }
      };

      setupDefaultFormulas(cmp.type, cmp._name);

      const evaluateDefaultFormulas = (componentName: string) => {
        if (cmp.meta) {
          Object.keys(cmp.meta).forEach((propertyName) => {
            const fxState = (cmp.meta as any)[propertyName];
            if (fxState && fxState.isFx && fxState.fx) {
              try {
                const evaluatedValue = evaluateFormula(fxState.fx);

                console.log(`Evaluating default formula for ${componentName}.${propertyName}: ${fxState.fx} = `, evaluatedValue);

                if (!defaultProps) defaultProps = {};
                defaultProps[propertyName] = evaluatedValue;

              } catch (error) {
                console.warn(`Failed to evaluate default formula for ${componentName}.${propertyName}:`, error);
              }
            }
          });
        }
      };

      evaluateDefaultFormulas(cmp._name);

      cmp = {
        ...cmp,
        position: finalPosition,
        grid: defaultConfiguration.grid,
        properties: {
          ...cmp.properties,
          ...defaultProps,
          _name: cmp._name,
        },
      };

      console.log("=== COMPONENT CREATED ===", cmp);

      setScreens((prev) => {
        const updatedScreens = [...prev];
        updatedScreens[selectedScreenIndex].body.push(cmp);
        return updatedScreens;
      });

      console.log("=== DRAG END COMPLETED SUCCESSFULLY ===");
    } else {
      console.log("=== DRAG END: NO DROP TARGET ===");
    }
  };

  const generateUniqueName = (type: string) => {
    let name = type.toLowerCase();
    const screen = screens[selectedScreenIndex];

    let ctrlMap: Record<string, number> = {};
    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        ctrlMap[cmp._name] = 1;
      });
    });

    let count = 0;
    if (ctrlMap[name]) {
      while (ctrlMap[name + (count > 0 ? count : "")]) {
        count++;
      }
    }

    name = name + (count > 0 ? count : "");
    return name;
  };

  const addComponent = (component: Component) => {
    console.log("in addComponent", component);

    setScreens((prev) => {
      const updatedScreens = [...prev];
      updatedScreens[selectedScreenIndex].body.push(component);
      return updatedScreens;
    });
  };

  const deleteComponent = () => {
    if (selectedComponent) {
      console.log("🗑️ Deleting component:", selectedComponent);

      const cleanupComponentFormulas = (componentName: string) => {
        const fxStates = fxStatesManager.getState();
        if (fxStates.formulaMeta[componentName]) {
          Object.keys(fxStates.formulaMeta[componentName]).forEach(propertyName => {
            fxStatesManager.removeFormula(componentName, propertyName);
          });
          console.log(`🗑️ Cleaned up formulas for: ${componentName}`);
        }
      };

      setScreens((prev) => {
        const updatedScreens = [...prev];

        const findAllDescendants = (
          componentId: string,
          components: Component[]
        ) => {
          let descendants: string[] = [];
          components.forEach((component: Component) => {
            if (component.parentId === componentId) {
              descendants.push(component.id);
              descendants = descendants.concat(
                findAllDescendants(component.id, components)
              );
            }
          });
          return descendants;
        };

        const allDescendants = findAllDescendants(
          selectedComponent.id,
          updatedScreens[selectedScreenIndex].body
        );
        allDescendants.push(selectedComponent.id);

        const componentsToDelete = updatedScreens[selectedScreenIndex].body.filter(
          component => allDescendants.includes(component.id)
        );

        componentsToDelete.forEach(component => {
          cleanupComponentFormulas(component._name);
        });

        const updatedBody = updatedScreens[selectedScreenIndex].body.filter(
          (component) =>
            component.id !== selectedComponent.id &&
            !allDescendants.includes(component.id)
        );

        updatedScreens[selectedScreenIndex].body = updatedBody;

        return updatedScreens;
      });

      setTimeout(() => {
        fxStatesManager.regenerateAllReverseDependencies();
        console.log("🗑️ Regenerated dependencies after component deletion");
      }, 0);

      setSelectedComponent(undefined);
    }
  };

  const getChildComponents = (parentId: string) => {
    let childComponents: Component[] = [];
    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        if (cmp.parentId === parentId) {
          childComponents.push(cmp);
        }
      });
    });
    return childComponents;
  };

  const generateNestedChildren = (
    component: Component,
    componentList: Component[] = [],
    newParentId: string = ""
  ) => {
    let childComponents = getChildComponents(component.id);
    childComponents.forEach((childCmp) => {
      let newName = generateUniqueName(childCmp.type);
      let newComponent = {
        ...childCmp,
        properties: {
          ...childCmp.properties,
          _name: newName,
        },
        _name: newName,
        id: generateUniqueId(),
        parentId: newParentId,
      };
      componentList.push(newComponent);
      generateNestedChildren(childCmp, componentList, newComponent.id);
    });
    return componentList;
  };

  const duplicateComponent = () => {
    if (selectedComponent) {
      let componentList: Component[] = [];
      let newName = generateUniqueName(selectedComponent.type);
      let newComponent = {
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          _name: newName,
        },
        _name: newName,
        id: generateUniqueId(),
        grid: {
          desktop: {
            x: selectedComponent.grid.desktop.x,
            y:
              (selectedComponent.grid.desktop.y || 0) +
              selectedComponent.grid.desktop.height,
            width: selectedComponent.grid.desktop.width,
            height: selectedComponent.grid.desktop.height,
          },
          mobile: {
            x: selectedComponent.grid.mobile.x,
            y:
              (selectedComponent.grid.mobile.y || 0) +
              selectedComponent.grid.mobile.height,
            width: selectedComponent.grid.mobile.width,
            height: selectedComponent.grid.mobile.height,
          },
        },
      };
      componentList.push(newComponent);
      let newParentId = newComponent.id;
      componentList = generateNestedChildren(
        selectedComponent,
        componentList,
        newParentId
      );
      setScreens((prev) => {
        const updatedScreens = [...prev];
        updatedScreens[selectedScreenIndex].body = [
          ...updatedScreens[selectedScreenIndex].body,
          ...componentList,
        ];

        return updatedScreens;
      });
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const updateComponent = (updatedComponent: Component) => {
    console.log(
      "componentContext updateComponent:",
      updatedComponent.id,
      "position:",
      updatedComponent.position,
      "grid:",
      updatedComponent.grid
    );
    setScreens((prev) => {
      const updatedScreens = [...prev];
      let componentFound = false;

      updatedScreens.forEach((screen) => {
        screen.body = screen.body.map((component) => {
          if (component.id === updatedComponent.id) {
            componentFound = true;
            console.log("Found component to update:", component.id);
            return updatedComponent;
          }
          return component;
        });
      });

      if (componentFound) {
        console.log("Component update completed");
        if (updatedComponent.position || updatedComponent.grid) {
          console.log("🚀 Immediate localStorage save for position/grid change");
          saveToLocalStorage(updatedScreens);
        }
      } else {
        console.warn("Component not found for update:", updatedComponent.id);
      }

      return updatedScreens;
    });
  };

  const triggerFormulaRecalculation = (
    type: 'component' | 'data',
    name: string,
    field?: string,
    options?: { oldName?: string; newName?: string }
  ) => {
    try {
      console.log(`🔍 [FormulaRecalc] Triggering recalculation for ${type}: ${name}${field ? `.${field}` : ''}`);

      const currentQueryState = queries.find((q: any) => q.name === name);
      console.log(`🔍 [FormulaRecalc] Current query state for ${name}:`, {
        found: !!currentQueryState,
        hasValue: !!currentQueryState?.value,
        valueKeys: currentQueryState?.value ? Object.keys(currentQueryState.value) : 'null',
        hasRows: !!currentQueryState?.value?.rows,
        rowsLength: currentQueryState?.value?.rows?.length
      });

      console.log(`🔍 [FormulaRecalc] FxStatesManager state:`, fxStatesManager.getState());

      if (type === 'component' && field) {
        fxStatesManager.markComponentForEvaluation(name, field);
      } else if (type === 'data') {
        if (options?.oldName && options?.newName && options.oldName !== options.newName) {
          console.log(`🔍 [FormulaRecalc] Handling name change: ${options.oldName} → ${options.newName}`);
          fxStatesManager.handleDataNameChange(options.oldName, options.newName);
        }
        console.log(`🔍 [FormulaRecalc] Marking data dependents for: ${name}`);
        fxStatesManager.markDataDependentsForEvaluation(name);
      }

      console.log(`🔍 [FormulaRecalc] Evaluation queue before processing:`, fxStatesManager.getState().evaluationQueue);

      fxStatesManager.processEvaluationQueue(evaluateFormula);

      console.log(`🔍 [FormulaRecalc] Evaluation queue after processing:`, fxStatesManager.getState().evaluationQueue);
      console.log(`🔍 [FormulaRecalc] Completed recalculation for ${type}: ${name}`);
    } catch (error) {
      console.error(`🔍 [FormulaRecalc] Error during recalculation for ${type}: ${name}`, error);
    }
  };

  useEffect(() => {
    if (queries.length > 0) {
      console.log("🔄 Queries updated, re-evaluating formulas...", queries.map(q => q.name));

      setTimeout(() => {
        queries.forEach(query => {
          if (query.name && query.value) {
            console.log(`🔄 Triggering formula recalculation for data: ${query.name}`, query.value);
            triggerFormulaRecalculation('data', query.name);
          }
        });
      }, 200);
    }
  }, [queries]);

  const updateProperties = (id: string, field: string, value: any) => {
    let matchDetails = {
      name: "",
      field,
      value,
    };

    setScreens((prev) => {
      const updatedScreens = prev.map((screen) => {
        const updatedBody = screen.body.map((cmp) => {
          if (cmp.id !== id) return cmp;

          matchDetails.name = cmp._name;
          const fxStates = fxStatesManager.getState();
          if (fxStates.liveValues) {
            delete fxStates.liveValues[`${matchDetails.name}.${field}`];
          }
          fxStates.liveValues[`${matchDetails.name}.${field}`] = value;

          const updatedComponent = {
            ...cmp,
            properties: {
              ...cmp.properties,
              [field]: value,
            },
          };

          updateComponentOutput(updatedComponent);
          return updatedComponent;
        });

        return { ...screen, body: updatedBody };
      });

      return updatedScreens;
    });

    setTimeout(() => {
      if (!matchDetails.name) {
        console.warn(`[updateProperties] No component found for id ${id}`);
        return;
      }

      console.log(`Property updated: ${matchDetails.name}.${field} = ${value}`);

      triggerFormulaRecalculation('component', matchDetails.name, field);

      onPropertyUpdate?.(
        matchDetails.name,
        matchDetails.field,
        matchDetails.value
      );
    }, 0);
  };

  const updateMetaProperties = (id: string, field: string, fxState: any) => {
    let componentName = "";

    setScreens((prev) => {
      const updatedScreens = [...prev];
      updatedScreens.forEach((screen) => {
        screen.body = screen.body.map((cmp) => {
          if (cmp.id === id) {
            componentName = cmp._name;

            if (fxState && typeof fxState === 'object') {
              console.log(`🔄 [updateMetaProperties] Updating formula for ${componentName}.${field}:`, fxState);

              fxStatesManager.setComponentMapping(componentName, id);

              if ('fx' in fxState) {
                const formula = fxState.fx || "";

                if (formula.trim().length > 0) {
                  const updatedFxState = fxStatesManager.updateFormulaAndDependencies(
                    componentName,
                    field,
                    formula
                  );

                  console.log(`🔄 [updateMetaProperties] Updated dependencies for ${componentName}.${field}:`, updatedFxState.deps);
                } else {
                  fxStatesManager.removeFormula(componentName, field);
                  console.log(`🔄 [updateMetaProperties] Removed empty formula for ${componentName}.${field}`);
                }
              }
            }

            const updatedComponent = {
              ...cmp,
              meta: {
                ...(cmp.meta || {}),
                [field]: fxState,
              },
            };
            updateComponentOutput(updatedComponent);
            return updatedComponent;
          }
          return cmp;
        });
      });

      return updatedScreens;
    });

    if (componentName && fxState && 'fx' in fxState) {
      setTimeout(() => {
        console.log(`🔄 [updateMetaProperties] FormulaManager debug info:`, fxStatesManager.getDependencyDebugInfo());
      }, 0);
    }
  };

  const onFxChange = (
    componentId: string,
    propertyName: string,
    fxState: any
  ) => {
    console.log(`🔄 [onFxChange] Formula changed for ${componentId}.${propertyName}:`, fxState);

    updateMetaProperties(componentId, propertyName, fxState);

    if (fxState.isFx && fxState.fx) {
      try {
        const result = evaluateFormula(fxState.fx);
        console.log(
          `Immediate evaluation result for ${componentId}.${propertyName}:`,
          result
        );

        updateProperties(componentId, propertyName, result);
      } catch (error) {
        console.error(
          `Error evaluating formula for ${componentId}.${propertyName}:`,
          error
        );
      }
    }
  };

  const updateGroupProperties = (id: string, fields: Record<string, any>) => {
    let matchDetails = {
      name: "",
      field: "",
      value: "",
    };

    setScreens((prev) => {
      const updatedScreens = [...prev];

      updatedScreens.forEach((screen) => {
        screen.body = screen.body.map((cmp) => {
          if (cmp.id === id) {
            const updatedComponent = {
              ...cmp,
              properties: {
                ...cmp.properties,
                ...fields,
              },
            };
            updateComponentOutput(updatedComponent);
            return updatedComponent;
          }
          return cmp;
        });
      });

      return updatedScreens;
    });
  };

  const updateComponentByName = (name: string, field: string, value: any) => {
    let matchDetails = {
      name: "",
      field: "",
      value: "",
    };
    setScreens((prev) => {
      const updatedScreens = [...prev];
      updatedScreens.forEach((screen) => {
        screen.body = screen.body.map((cmp) => {
          if (cmp._name === name) {
            const updatedComponent = {
              ...cmp,
              properties: {
                ...cmp.properties,
                [field]: value,
              },
            };
            updateComponentOutput(updatedComponent);
            matchDetails = { name: cmp._name, field: field, value: value };
            return updatedComponent;
          }
          return cmp;
        });
      });

      return updatedScreens;
    });

    if (matchDetails.name) {
      onPropertyUpdate(
        matchDetails.name,
        matchDetails.field,
        matchDetails.value
      );
    }
  };

  const updateScreenProperties = (id: string, field: string, value: any) => {
    setScreens((prev) => {
      const updatedScreens = [...prev];
      updatedScreens[selectedScreenIndex].properties = {
        ...updatedScreens[selectedScreenIndex].properties,
        [field]: value,
      };

      return updatedScreens;
    });
  };

  const updateComponentOutput = (component: Component) => {
    let output = "";
    output = component.properties.value || "";
    updateComponent({ ...component, ...{ output: output } });
  };

  const getComponentSuggestions = () => {
    let suggestionKeyDataTypes: Record<string, string> = {};
    let functions = Object.keys(_)
      .filter(
        (key: string) => typeof _[key as keyof LoDashStatic] === "function"
      )
      .map((name) => {
        suggestionKeyDataTypes[name] = "Function";
        return "_." + name;
      });

    let suggestions = functions.concat(functions);
    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        let name = cmp.properties._name;
        Object.keys(cmp.properties).forEach((prop) => {
          if (prop !== "_name") {
            suggestionKeyDataTypes[name + "." + prop] = getDatatypes(
              cmp.properties[prop]
            );
            suggestions.push(name + "." + prop);
          }
        });
      });
    });

    queries.forEach((query: any) => {
      suggestionKeyDataTypes[query.name] = getDatatypes(query.value);
      suggestions.push(query.name);
    });

    return {
      suggestions: suggestions,
      suggestionKeyDataTypes: suggestionKeyDataTypes,
    };
  };

  const getRepeatItemSuggestions = (childId: string) => {
    let suggestionKeyDataTypes: Record<string, string> = {};
    let suggestions: string[] = [];
    let allCmps: Record<string, any> = {};
    let parentName = "";
    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        let name = cmp.properties._name;
        allCmps[cmp.id] = cmp;
      });
    });

    let childOrignalId = childId;
    if (childId.indexOf("_idx_") > -1) {
      childId = childId.split("_idx_")[0];
    }

    if (allCmps[childId] && allCmps[childId]["type"] != "Repeat") {
      let parentId = allCmps[childId]["parentId"];
      if (parentId && allCmps[parentId]["type"] == "Repeat") {
      } else if (parentId) {
        while (parentId != null || allCmps[parentId]["type"] == "Repeat") {
          parentId = allCmps[childId][parentId];
        }
      }

      if (parentId && allCmps[parentId]["type"] == "Repeat") {
        let formula = allCmps[parentId]["properties"]["formula"];
        parentName = allCmps[parentId]["properties"]["_name"];
        if (formula && formula.length > 0) {
          let result = evaluateFormula(formula, {}, { id: parentId });
          if (Array.isArray(result) && result.length > 0) {
            let repeatItemKeys = Object.keys(result[0]);
            repeatItemKeys.forEach((key: string) => {
              suggestions.push(parentName + ".ITEM." + key);
              suggestionKeyDataTypes[parentName + ".ITEM." + key] =
                getDatatypes(result[0][key]);
            });
          }
        }
      }
    }

    return {
      suggestions: suggestions,
      suggestionKeyDataTypes: suggestionKeyDataTypes,
      parentName: parentName,
    };
  };

  const getComponentsMatchingSuggestions = (mainKey: string) => {
    let functions = Object.keys(_)
      .filter(
        (key: string) => typeof _[key as keyof LoDashStatic] === "function"
      )
      .map((name) => {
        return "_." + name;
      });

    let suggestions: string[] = [];
    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        let name = cmp.properties._name;
        Object.keys(cmp.properties).forEach((prop) => {
          if (prop !== "_name") {
            suggestions.push(name + "." + prop);
          }
        });
      });
    });

    queries.forEach((query: any) => {
      suggestions.push(query.name);
    });
    return suggestions.concat(functions);
  };

  const getComponentPropertiesMap = () => {
    let map: Record<string, any> = {};
    let cmpKeys: Array<string> = [];
    let cmpValues: Array<any> = [];

    screens.forEach((screen) => {
      screen.body.forEach((cmp) => {
        if (cmp.properties._name) {
          cmpKeys.push(cmp.properties._name);
          cmpValues.push(cmp.properties);
        }
      });
    });

    queries.forEach((query: Query) => {
      if (query.name) {
        cmpKeys.push(query.name);
        cmpValues.push(query.value);
      }
    });
    return { cmpKeys: cmpKeys, cmpValues: cmpValues };
  };

  function getDatatypes(value: any) {
    var dataType = "String";
    if (Object.prototype.toString.call(value) == "[object Object]") {
      dataType = "Object";
    } else if (Object.prototype.toString.call(value) == "[object String]") {
      dataType = "String";
    } else if (Object.prototype.toString.call(value) == "[object Number]") {
      dataType = "Number";
    } else if (Object.prototype.toString.call(value) == "[object Array]") {
      dataType = "Array";
    } else if (Object.prototype.toString.call(value) == "[object Null]") {
      dataType = "Null";
    }
    return dataType;
  }

  const getUsedComponents = (formula = "") => {
    return fxStatesManager.extractDependencies(formula);
  };

  const evaluateFormula = (
    formula = "",
    taskData: { [key: string]: any } = {},
    options: Record<string, string> = {}
  ) => {
    let id = options.id || "";
    let name = options.name || "";
    let liveValues = options.liveValues || {};
    let REPEATITEMSEP = "__RPKEY__";
    console.log("result in componentContext", formula);
    try {
      if (!screens || !screens[selectedScreenIndex]) {
        console.error("Invalid screen or selected screen index");
        return formula;
      }

      let { cmpKeys, cmpValues } = getComponentPropertiesMap();

      let splitIds = id.split("_idx_");
      let splitNames = name.split("_idx_");

      if (id && splitIds.length > 0) {
        let { suggestions, parentName } = getRepeatItemSuggestions(id);
        let index = 0;
        if (splitIds.length > 1) {
          index = Number(splitIds[splitIds.length - 1]);
        }

        let sugKeyName = parentName + ".ITEM." + splitNames[0];

        if (cmpKeys.indexOf(parentName) > -1) {
          let repeatValue =
            cmpValues[cmpKeys.indexOf(parentName)]["value"] || [];
          if (Array.isArray(repeatValue) && repeatValue.length > index) {
            let indexObj: Record<string, any> = repeatValue[index];
            suggestions.forEach((key: string) => {
              let splitKey = key.split(".");
              if (indexObj.hasOwnProperty(splitKey[2])) {
                cmpKeys.push(key.split(".").join(REPEATITEMSEP));
                cmpValues.push(indexObj[splitKey[2]]);
              }
            });
          }
        }
      }

      cmpKeys = cmpKeys.concat(Object.keys(taskData));
      cmpValues = cmpValues.concat(Object.values(taskData));

      Object.keys(liveValues).forEach((key: string) => {
        let splitPath = key.split(".");
        let cmpId = splitPath[0];
        let propertyPath = splitPath.slice(1).join(".");
        let propIndex = cmpKeys.indexOf(cmpId);
        if (propIndex > -1) {
          let cmpValue = liveValues[key as keyof typeof liveValues];
          cmpValues[propIndex][propertyPath] =
            liveValues[key as keyof typeof liveValues];
        }
      });

      const geExpressionData = (expression: string) => {
        var result = null;
        try {
          var funExpression = new Function(
            cmpKeys.join(","),
            "return " + expression
          );
          console.log("in FUNCTION EXPRESSION");
          result = funExpression(...cmpValues);
          if (typeof result == "function") {
            result = null;
          }
          console.log("result in componentContext", result);
        } catch (ex: any) {
          console.log("error in componentContext", ex.message);
          result = null;
          throw new Error(ex.message);
        }
        console.log("result in componentContext", result);
        return result;
      };

      const isStringifiedJSON = (str: string) => {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      };

      if (formula == null) return null;

      let hasInterpolation = /{{([^}]+)}}/.test(formula);

      let varCounter = 0;
      let originalValues: Record<string, any> = {};
      let replacedFormula = formula.replace(/{{([^}]+)}}/g, (match, p1) => {
        let expression = p1.trim();
        varCounter++;

        if (expression.includes(".ITEM.")) {
          expression = expression.split(".").join(REPEATITEMSEP);
        }

        let value = geExpressionData(expression);
        originalValues[expression] = value;
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);

        if (typeof value === "string") {
          return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        }

        return value;
      });

      if (Object.keys(originalValues).length == 1 && originalValues.hasOwnProperty(formula.replace(/{{|}}/g, "").trim())) {
        return Object.values(originalValues)[0];
      }

      try {
        if (!hasInterpolation) {
          const trimmed = replacedFormula.trim();
          if (trimmed === "true") return true;
          if (trimmed === "false") return false;
          if (isStringifiedJSON(trimmed)) return JSON.parse(trimmed);
          if (trimmed && !isNaN(Number(trimmed))) return Number(trimmed);
          return trimmed;
        }

        if (/^[\d\s+\-*/().,'"\[\]{}]+$/.test(replacedFormula)) {
          return new Function("return " + replacedFormula)();
        }

        const templateFormula =
          "`" +
          formula.replace(/{{([^}]+)}}/g, "${geExpressionData('$1')}") +
          "`";
        const fnResult = new Function(
          "geExpressionData",
          "return " + templateFormula
        )(geExpressionData);

        return fnResult;
      } catch (e) {
        console.error(
          "Error evaluating formula:",
          e,
          "Formula:",
          formula,
          "Replaced:",
          replacedFormula
        );
        return replacedFormula;
      }
    } catch (ex: any) {
      console.log("result in componentContext", ex.message);
      return null;
    }
  };

  const addScreen = (screenType: string = "screen") => {
    let nextScreenNumber = 0;
    let newScreenId = screenType;

    const allScreens = screens;

    while (allScreens.find((screen: any) => screen.id === newScreenId)) {
      nextScreenNumber++;
      newScreenId = `${screenType}-${nextScreenNumber}`;
    }

    const newScreens = [
      ...screens,
      { id: newScreenId, type: screenType, body: [] },
    ];
    setScreens(newScreens);

    const newIndex = screens.length;
    setSelectedScreenIndex(newIndex);
  };

  const deleteScreen = (index: number) => {
    selectScreen(0);
    setSelectedComponent(undefined);

    let remainingScreen = screens.filter((screen, ind) => {
      return ind != index;
    });

    setScreens(remainingScreen);
  };

  const selectScreen = (index: number) => {
    setSelectedScreenIndex(index);
  };

  const togglePropertySidebar = () => {
    setPropertySidebar(!propertySidebar);
  };
  const toggleLeftSidebar = () => {
    setLeftSidebar(!leftSidebar);
  };

  const enhancedSetQueries = (newQueries: Query[]) => {
    console.log("🔄 Setting queries and triggering formula re-evaluation:", newQueries.map(q => q.name));

    const prevQueries = [...queries];
    setQueries(newQueries);

    setTimeout(() => {
      newQueries.forEach(query => {
        if (query.name && query.value) {
          const prevQuery = prevQueries.find(q => q.name === query.name);
          const hasChanged = !prevQuery || JSON.stringify(prevQuery.value) !== JSON.stringify(query.value);
          
          if (hasChanged) {
            console.log(`🔄 Query ${query.name} changed, triggering formula recalculation`);
            triggerFormulaRecalculation('data', query.name);
          }
        }
      });
    }, 100);
  };

  const contextValue: Context = {
    interfaceView,
    setInterfaceView,
    screens,
    queries,
    propertySidebar,
    leftSidebar,
    togglePropertySidebar,
    toggleLeftSidebar,
    setQueries: enhancedSetQueries,
    selectedScreenIndex,
    setSelectedScreenIndex,
    onDragEnd,
    selectedComponent,
    setSelectedComponent,
    selectComponent,
    addComponent,
    deleteComponent,
    duplicateComponent,
    updateProperties,
    updateMetaProperties,
    onFxChange,
    updateGroupProperties,
    updateScreenProperties,
    onPropertyUpdate,
    addScreen,
    updateComponentByName,
    selectScreen,
    deleteScreen,
    updateComponent,
    evaluateFormula,
    triggerFormulaRecalculation,
    initScreens,
    getComponentSuggestions,
    getRepeatItemSuggestions,
    getFromLocalStorage,
    getQueriesFromLocalStorage,
    saveQueriesToLocalStorage,
    listener,
    getUsedComponents,
    setSidebar,
    setPopup,
    setHeader,
    selectedSidebarId,
    selectedPopupId,
    selectedHeaderId,
    onScreenChange,
    initandOpenSidebar,
    sidebarNavState,
    setSidebarNavState,
    initandOpenPopup,
    popupNavState,
    setPopupNavState,
    initandOpenHeader,
    headerNavState,
    setHeaderNavState,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(Context);
  if (context) {
    return context;
  } else {
    throw new Error("Context not supported");
  }
};