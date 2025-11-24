import { BaseComponent, BaseProps, getDefaultProps } from '../../baseComponent';
import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useDroppable } from '@dnd-kit/core';
import { ComponentMap, getDefaultConfiguration } from '../../allComponents';
import { SafeRenderComponent } from './renderComponent';
import { AiOutlineHolder } from 'react-icons/ai';
import { ElementTypes } from '../../elements_types';
import { ChangeTrackerProvider } from '../../context/ChangeTracker/ChangeTrackerContext';
import { useComponentContext, Query, Screen } from '../../context/componentContext';
import appData from '../../appData';
import ResizeIndicator from '../../components/ResizeIndicator';

import { defaultProps, EditProperties, ScreenPanelProps } from './screenPanelProps';

import './style.css';
import { Empty, Typography } from 'antd';
import PreviewHeader from '../../Preview/PreviewHeader';

const startJson = appData.screens as Screen[];
const queriesData = appData.queries as Query[];

// Types for the component's props

const ScreenAsComponent: React.FC<ScreenPanelProps> & { PropsList?: string[], EditProperties?: {}, defaultProps?: {}, } = React.memo((props) => {
  const { screens, initScreens, queries, interfaceView, setInterfaceView, setQueries, selectedScreenIndex, selectedComponent, updateProperties, setSelectedComponent, updateComponent, addComponent, getFromLocalStorage, getQueriesFromLocalStorage, propertySidebar, leftSidebar } = useComponentContext();
  const { isOver, setNodeRef } = useDroppable({ id: 'drop-container' });
  const [dragCntHeight, setDragCntHeight] = useState(600);

  const currentScreen = screens[selectedScreenIndex];

  const GRIDCOUNT = 24;

  console.log("props", props, currentScreen);
  let {
    width,
    type,
    title,
    screenUrl,
    backgroundColor,
    margin,
    padding,
    height,
    borderRadius,
    fontFamily,
    textAlign = "center",
    position,
    heightOrWidth,
    header,
    headerheight,
    // updateProperties,
    ...rest
  } = { ...defaultProps, ...props };
  console.log("EditProperties====", EditProperties, screens)

  console.log("555555", backgroundColor, position, header);

  const screenPanelStyle: React.CSSProperties = {
    height: "100vh",
    width: '100%',
    position: 'relative',
    msOverflowY: 'auto',
    // backgroundColor: backgroundColor,
    // borderRadius: borderRadius,
    // margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    // padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    display: currentScreen.type === 'popup' ? 'flex' : undefined,
    alignItems: currentScreen.type === 'popup' ? 'center' : undefined,
    justifyContent: currentScreen.type === 'popup' ? 'center' : undefined,
  };
  if (currentScreen.type == "screen") {
    screenPanelStyle["boxShadow"] = "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px";
  }

  if (interfaceView == "mobile" && currentScreen.type == "screen") {
    screenPanelStyle["display"] = "flex";
    screenPanelStyle["justifyContent"] = "center";
    screenPanelStyle["alignItems"] = "center";
    screenPanelStyle["flexDirection"] = "column";
    screenPanelStyle["width"] = interfaceView == "mobile" && currentScreen.type == "screen" ? "400px" : "100%";
    screenPanelStyle["marginLeft"] = interfaceView == "mobile" && currentScreen.type == "screen" ? "calc(calc((100% - 400px) / 2))" : "0"
  }


  const listStyle: React.CSSProperties = {
    height: currentScreen.type === 'sidebar' && position === 'bottom' || position === 'top' ? heightOrWidth : currentScreen.type === 'sidebar' && position === 'left' || position === 'right' ? '100%' : currentScreen.type === 'screen' ? '100%' : currentScreen.type === 'header' ? headerheight : height,
    width: currentScreen.type === 'screen' || currentScreen.type === 'header' ? '100%' : currentScreen.type === 'sidebar' && position === 'bottom' || position === 'top' ? '100%' : currentScreen.type === 'sidebar' && position === 'left' || position === 'right' ? heightOrWidth : width,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
    margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    boxShadow: currentScreen.type === 'screen' ? undefined : ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    position: currentScreen.type === 'sidebar' ? 'absolute' : 'relative',
    // position:'relative', 
    // msOverflowY: 'auto',
    top: currentScreen.type === 'sidebar' && position === 'top' ? '0px' : undefined,
    bottom: currentScreen.type === 'sidebar' && position === 'bottom' ? '0px' : undefined,
    right: currentScreen.type === 'sidebar' && position === 'right' ? '0px' : undefined,
    left: currentScreen.type === 'sidebar' && position === 'left' ? '0px' : undefined
  };

  if (currentScreen.type !== "popup" && currentScreen.type !== "header") {
    // listStyle["overflowY"] = "auto";
  }
  if (interfaceView == "mobile" && currentScreen.type == "screen") {
    listStyle["width"] = "400px";
  }

  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const drawingRef = useRef<HTMLDivElement | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [draggingComponent, setDraggingComponent] = useState(false);
  const [isResChanged, setIsResChanged] = useState(true);
  const [gridWSize, setGridWSize] = useState(10);
  const [isMovement, setIsMovement] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const rndRef = React.useRef<Rnd>(null);
  const rndRefs = useRef<(Rnd | null)[]>([]);

  let rndGridList: { componentId: string; ref: Rnd | null; grid: any; }[] = [];

  const [wid, setWid] = React.useState(0);

  const getCurrentScreenComponents = () => {
    return currentScreen.body.filter((component) => !component.parentId);
  };

  let lastInterfaceView = interfaceView;
  let lastUpdatedSize: any = 0;

  const updateAllSizes = () => {
    console.log("in update all sizes, interfaceView", interfaceView);
    // if(lastInterfaceView !== interfaceView) {
    //   lastInterfaceView = interfaceView;
    if (ref.current) {
      var wSize = ref.current.offsetWidth / GRIDCOUNT;
      rndRefs.current.forEach((rndRef) => {
        if (rndRef) {
          let grid = rndRef.props.grid;
          let id = rndRef.props.cmpId;
          let gridWP = interfaceView == "mobile" ? grid.mobile : grid.desktop;
          rndRef.updatePosition({ x: (gridWP?.x || 0) * (wSize), y: (gridWP?.y || 0) * 10 });
          rndRef.updateSize({ width: ((gridWP?.width || 1) * (100 / GRIDCOUNT)) + '%', height: ((gridWP?.height || 10) * 10) + 'px' });
        }
      });
    }
    //}
  };

  const getHeadersProperties = () => {
    if (screens.length > 0) {
      const matchHeader = screens.filter((screen) => screen.type === 'header');
      console.log("matchHeader", matchHeader)
      let arr = ["None", ...matchHeader.map((ele) => ele.id)];
      console.log("arrarr", arr)
      EditProperties[1].elements[8] = {
        label: "Header",
        name: "header",
        type: ElementTypes.SELECT(arr),
        showLabel: true,
        width: 24,
      };
    }
  }
  console.log("screensscreens", screens)
  getHeadersProperties();


  React.useEffect(() => {
    setTimeout(() => {
      updateAllSizes();
    }, 100);
  }, [interfaceView]);


  React.useEffect(() => {
    console.log("SIDEBAR USEEFFECT");
    const updateWidth = () => {
      if (ref.current) {
        let currentWidth = ref.current.offsetWidth;
        !wid && setWid(ref.current.offsetWidth);
        setIsResChanged(true);
        if (rndRefs.current && currentWidth) {
          updateAllSizes();
          console.log("in current ref");
          console.log(rndRefs);
        }
        setGridWSize(ref.current.offsetWidth / GRIDCOUNT);
      }
    };
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        const newWidth = ref.current.offsetWidth;
        if (newWidth !== wid && lastInterfaceView === interfaceView) {
          setWid(newWidth);
          // Optionally, you could calculate other values like oGridSize here
          setGridWSize(newWidth / GRIDCOUNT); // Example calculation
          updateWidth();
        }
      }
    });
    updateWidth();
    // Add resize event listener
    window.addEventListener("resize", updateWidth);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    // Cleanup event listener on unmount
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      window.removeEventListener("resize", updateWidth);
    };
  }, [leftSidebar, propertySidebar]);



  useEffect(() => {
    if (getFromLocalStorage) {
      const localScreens = getFromLocalStorage();
      if (localScreens) {
        initScreens(localScreens);
      }
      else {
        if (startJson) {
          initScreens(startJson as unknown as Screen[]);
        }
      }
    }
    if (getQueriesFromLocalStorage) {
      const localQueries: Query[] = getQueriesFromLocalStorage();
      if (localQueries && localQueries.length) {
        setQueries(localQueries);
      }
      else {
        if (queriesData) {
          setQueries(queriesData as unknown as Query[]);
        }
      }
    }

  }, [startJson, queriesData]);

  const startDrawing = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingComponent || e.target instanceof HTMLInputElement) return; // Prevent drawing when input is focused
    setIsDrawing(true);
    const rect = drawingRef.current?.getBoundingClientRect();
    if (!rect) return;
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setStartCoords({ x: startX, y: startY });
    setCurrentRect({ x: startX, y: startY, width: 0, height: 0 });
    setHasMoved(false);
  };

  const drawRectangle = (e: MouseEvent) => {
    if (draggingComponent) return;
    if (isDrawing && currentRect && drawingRef.current) {
      const rect = drawingRef.current.getBoundingClientRect();
      const width = e.clientX - rect.left - startCoords.x;
      const height = e.clientY - rect.top - startCoords.y;
      setCurrentRect({
        ...currentRect,
        width: Math.max(0, width),
        height: Math.max(0, height),
      });
    }
  };

  const stopDrawing = (e: MouseEvent) => {
    if (draggingComponent || e.target instanceof HTMLInputElement) return; // Prevent drawing when input is focused
    if (isDrawing && currentRect && hasMoved) {
      const rect = drawingRef.current?.getBoundingClientRect();
      const endX = e.clientX - (rect ? rect.left : 0);
      const endY = e.clientY - (rect ? rect.top : 0);

      const width = Math.max(0, endX - startCoords.x);
      const height = Math.max(0, endY - startCoords.y);
      let random = (Math.random() + 1).toString(36).substring(7);

      addComponent({
        type: 'Container',
        id: Date.now().toString(),
        position: { x: startCoords.x, y: startCoords.y },
        size: { width, height },
        grid: {
          desktop: {
            height, width
          },
          mobile: {
            height, width
          }
        },
        properties: {},
        _name: "container" + random
      });
      setCurrentRect(null);
    }
    setIsDrawing(false);
  };
  const defaultGrid = {
    grid: {
      desktop: {
        height: 50, width: 1
      },
      mobile: {
        height: 5, width: 10
      }
    },
  }
  const handleDragStart = () => {
    setIsMovement(true);
    setDraggingComponent(true);
  };

  const handleDragEnd = () => {
    setDraggingComponent(false);
  };

  const showScreenProperties = () => {
    console.log("show screen properties");
    setSelectedComponent(undefined);
    // Component selection cleared for standalone mode
  };

  const CustomHandle = ({ name }: { name: string }) => (
    <div style={{
      width: 'auto',
      height: '22px',
      backgroundColor: '#4096ff',
      cursor: 'move',
      position: 'absolute',
      top: '-14px',
      left: '0px',
      transform: 'translateY(-50%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: '12px',
      padding: '0 8px',
      borderRadius: '4px',
      fontWeight: '500',
      zIndex: 10,
      border: '1px solid #1677ff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      userSelect: 'none',
      transition: 'all 0.2s ease',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1677ff';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#4096ff';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      <AiOutlineHolder style={{ marginRight: '4px' }} />
      <span>{name}</span>
    </div>
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        drawRectangle(e);
        setHasMoved(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrawing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrawing);
    };
  }, [isDrawing, currentRect]);

  let maxYH = 0;
  let curScreenCmps = getCurrentScreenComponents();
  console.log("curScreenCmps", curScreenCmps);
  curScreenCmps.filter((cmp: any) => {
    if (cmp.grid) {
      let currentGridSP = interfaceView === "mobile" ? cmp.grid.mobile : cmp.grid.desktop;
      currentGridSP.y + currentGridSP.height > maxYH && (maxYH = currentGridSP.y + currentGridSP.height);
    }
  });

  let windowHeight = window.innerHeight - 50;

  screenPanelStyle["height"] = currentScreen.type === 'screen' ? Math.max((maxYH * 10 + 100), windowHeight) + 'px' : screenPanelStyle["height"];

  const [headerScreen, setHeaderScreen] = useState<{} | null>(null);
  useEffect(() => {
    let matchedHeader = screens.find((scr) => scr.id === header);
    console.log("matchedHeader", matchedHeader)
    if (matchedHeader) {
      setHeaderScreen(matchedHeader);
    }
    else {
      setHeaderScreen(null);
    }
  }, [header, screens]);
  console.log("headerScreen", headerScreen)

  // Add CSS for pulse animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.7;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ChangeTrackerProvider>
      <div
        ref={(node) => {
          setNodeRef(node);
          drawingRef.current = node;
        }}
        className={`h-full w-full bg-gray-100 ${isOver ? 'bg-gray-200' : ''}`}
        style={{ ...screenPanelStyle }}
        onMouseDown={startDrawing}
        id='screen-drop-container'
        onClick={showScreenProperties}
      >
        {currentScreen.type === 'screen' && headerScreen &&
          <PreviewHeader screen={headerScreen} isVisible={headerScreen !== null} />}

        <div className={`list flex items-center relative justify-center mx-auto w-ful flex-col screen_panel ${isOver || isMovement ? "panel_grid" : ""}`} style={listStyle} ref={ref}>

          {wid && curScreenCmps.length > 0 && curScreenCmps.map((component, index) => {
            let configuration = getDefaultConfiguration(component.type);
            let grid = { ...configuration.grid, ...component.grid };
            let resizable: { width: boolean, height: boolean } = configuration.resizable;

            console.log("In controls filterig 44444", grid);

            let resizableConfig = {
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }
            if (!resizable.height) {
              resizableConfig.top = false;
              resizableConfig.bottom = false;
              resizableConfig.topRight = false;
              resizableConfig.topLeft = false;
              resizableConfig.bottomRight = false;
              resizableConfig.bottomLeft = false;
            }

            let currentGridSP = interfaceView === "mobile" ? grid.mobile : grid.desktop;
            let currentGridStyle = {
              x: (currentGridSP?.x || 0) * (gridWSize),
              y: (currentGridSP?.y || 0) * 10,
              width: ((currentGridSP?.width || 1) * (100 / GRIDCOUNT)) + '%',
              height: ((currentGridSP?.height || 10) * 10) + 'px',
            };

            // Standalone mode - no collaborative editing
            const activeUsers: any[] = [];
            const isBeingEditedByOthers = false;
            const activeUserColor = null;

            return (
              <>
                <Rnd
                  ref={(el) => {
                    rndRefs.current[index] = el;
                  }}

                  key={component.id}
                  cmpId={component.id}
                  grid={grid}
                  default={currentGridStyle}
                  minWidth={wid / GRIDCOUNT}
                  // minHeight={20}
                  resizeGrid={[gridWSize, 10]}
                  dragGrid={[gridWSize, 10]}
                  bounds="parent"
                  onDragStart={handleDragStart}
                  onDragStop={(e, data) => {
                    setIsMovement(false);
                    console.log("🔄 ScreenAsComponent onDragStop:", {
                      position: { x: data.x, y: data.y },
                      delta: { x: data.deltaX, y: data.deltaY },
                      componentId: component.id
                    });
                    setDragCntHeight(data.y + 50);

                    // 🔧 TEMPORARY: Remove threshold check to test saving
                    // const hasMovement = Math.abs(data.deltaX) >= 3 || Math.abs(data.deltaY) >= 3;

                    // if (!hasMovement) {
                    //   console.log("🚫 ScreenAsComponent onDragStop: No significant movement detected - skipping position update");
                    //   return;
                    // }

                    console.log("✅ ScreenAsComponent onDragStop: Processing position update (threshold disabled for testing)...");

                    let gridWidthSize = (wid / GRIDCOUNT);
                    let gridWidth = Math.round(data.node.clientWidth / gridWidthSize);
                    let gridHeight = Math.round(data.node.clientHeight / 10);

                    let gridX = Math.round(data.x / gridWidthSize);
                    let gridY = Math.round(data.y / 10);
                    delete component.parentId;

                    let editedOnDRS = component.properties.editedOnDRS;

                    let gridDesktop = component.grid.desktop;
                    let gridMobile = component.grid.mobile;
                    if (interfaceView == "mobile") {
                      editedOnDRS = true;
                      gridMobile = {
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      };

                    }
                    else {
                      gridDesktop = {

                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      }
                      if (!component.properties.editedOnDRS) {
                        gridMobile = {
                          width: gridWidth,
                          height: gridHeight,
                          x: gridX,
                          y: gridY,
                        };
                      }
                    }

                    const updatedComponent = {
                      ...component,
                      properties: {
                        ...component.properties,
                        editedOnDRS: editedOnDRS
                      },
                      grid: {
                        desktop: {
                          ...component.grid.desktop,
                          ...gridDesktop,
                        },
                        mobile: { // Retain the existing mobile grid
                          ...component.grid.mobile,
                          ...gridMobile,
                        },
                      },
                      position: { x: data.x, y: data.y }
                    };

                    console.log("💾 ScreenAsComponent: Saving component position:", {
                      id: updatedComponent.id,
                      oldPosition: component.position,
                      newPosition: updatedComponent.position,
                      gridData: {
                        desktop: gridDesktop,
                        mobile: gridMobile
                      }
                    });

                    updateComponent(updatedComponent);
                    { console.log("component", getDefaultConfiguration(component.type)) }
                    handleDragEnd();
                  }}
                  onResizeStart={() => {
                    setIsMovement(true);
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    console.log("in resize stop");
                    setIsMovement(false);
                    let gridWidthSize = (wid / GRIDCOUNT);
                    let gridWidth = Math.round(ref.clientWidth / gridWidthSize);
                    let gridHeight = Math.round(ref.offsetHeight / 10);

                    let gridX = Math.round(position.x / gridWidthSize);
                    let gridY = Math.round(position.y / 10);
                    let editedOnDRS = component.properties.editedOnDRS;

                    let gridDesktop = component.grid.desktop;
                    let gridMobile = component.grid.mobile;
                    if (interfaceView == "mobile") {
                      editedOnDRS = true;
                      gridMobile = {
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      };

                    }
                    else {
                      gridDesktop = {
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      }
                      if (!component.properties.editedOnDRS) {
                        gridMobile = {
                          width: gridWidth,
                          height: gridHeight,
                          x: gridX,
                          y: gridY,
                        };
                      }
                    }

                    const updatedComponent = {
                      ...component,
                      properties: {
                        ...component.properties,
                        editedOnDRS: editedOnDRS
                      },
                      grid: {
                        desktop: {
                          ...component.grid.desktop,
                          ...gridDesktop
                        },
                        mobile: { // Retain the existing mobile grid
                          ...component.grid.mobile,
                          ...gridMobile
                        },
                      },
                      position,
                    };
                    console.log("Resize - calling updateComponent with:", updatedComponent.id);
                    updateComponent(updatedComponent);
                  }}
                  enableResizing={{ ...resizableConfig }}
                >
                  <div
                    className={`relative border rounded-sm ${selectedComponent?.id === component.id
                      ? 'border-blue-500 selected-component'
                      : 'border-transparent'
                      } ${isMovement ? 'resizing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComponent(component);
                      // Component selected for standalone mode
                    }}
                    style={{
                      height: "inherit",
                      // Add colored border for components being edited by other users
                      ...(isBeingEditedByOthers && selectedComponent?.id !== component.id ? {
                        border: `3px solid ${activeUserColor}`,
                        borderRadius: '4px',
                        boxShadow: `0 0 8px ${activeUserColor}40`, // Add glow effect
                        position: 'relative'
                      } : {})
                    }}
                  >
                    {selectedComponent?.id === component.id && <CustomHandle name={component._name} />}
                    <ResizeIndicator isSelected={selectedComponent?.id === component.id} />
                    {/* Show active editing indicator for other users */}
                    {isBeingEditedByOthers && selectedComponent?.id !== component.id && activeUserColor && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '16px',
                          height: '16px',
                          backgroundColor: activeUserColor,
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          zIndex: 1000,
                          animation: 'pulse 2s infinite'
                        }}
                        title={`Being edited by ${activeUsers[0].userId}`}
                      />
                    )}
                    <SafeRenderComponent component={component} updateProperties={updateProperties} />
                  </div>
                </Rnd >
              </>
            )
          })}
          {curScreenCmps.length == 0 && <Empty description={<Typography.Text style={{ color: "#6d6d6d", height: '3rem' }}>Drag controls here</Typography.Text>} />}
          {
            currentRect && (
              <div
                style={{
                  position: 'absolute',
                  left: currentRect.x,
                  top: currentRect.y,
                  width: currentRect.width,
                  height: currentRect.height,
                  backgroundColor: 'rgba(100, 150, 250, 0.3)',
                  border: '1px dashed #007bff',
                  pointerEvents: 'none',
                }}
              />
            )
          }
        </div >
      </div >
    </ChangeTrackerProvider >
  );

}, (prevProps: any, nextProps: any) => {
  // Ignore if the reference is the same
  if (prevProps === nextProps) return true;

  // Log for debugging
  console.log("ScreenAsComponent memo comparison:", {
    prevPropsKeys: Object.keys(prevProps),
    nextPropsKeys: Object.keys(nextProps)
  });

  // Compare only essential properties that can change
  const keysToCheck = [
    "id",
    "_mode",
    "title",
    "screenUrl",
    "backgroundColor",
    "position",
    "heightOrWidth",
    "height",
    "width",
    "header",
    "headerheight",
  ];

  for (const key of keysToCheck) {
    if (prevProps[key] !== nextProps[key]) {
      console.log(`ScreenAsComponent re-rendering due to change in ${key}:`, prevProps[key], "->", nextProps[key]);
      return false;
    }
  }

  // Compare array values (only if they exist)
  const arrayKeys = ['borderRadius', 'margin', 'padding'];
  for (const arrayKey of arrayKeys) {
    if (prevProps[arrayKey] || nextProps[arrayKey]) {
      if (JSON.stringify(prevProps[arrayKey]) !== JSON.stringify(nextProps[arrayKey])) {
        console.log(`ScreenAsComponent re-rendering due to change in ${arrayKey}`);
        return false;
      }
    }
  }

  // Always prevent re-render unless essential properties actually changed
  console.log("ScreenAsComponent: No essential changes detected, preventing re-render");
  return true; // No changes detected, prevent re-render
});

ScreenAsComponent.defaultProps = defaultProps;
ScreenAsComponent.EditProperties = EditProperties;
ScreenAsComponent.PropsList = Object.keys(EditProperties);
export default ScreenAsComponent;
// export default React.memo(ScreenAsComponent);
