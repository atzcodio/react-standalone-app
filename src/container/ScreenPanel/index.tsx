import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Rnd } from 'react-rnd';
import { useComponentContext, Query, Screen } from '../../context/componentContext';
import { ComponentMap, getDefaultConfiguration } from '../../allComponents';
import { ChangeTrackerProvider } from '../../context/ChangeTracker/ChangeTrackerContext';
import { SafeRenderComponent } from './renderComponent';
import appData from '../../appData';
import { AiOutlineHolder } from "react-icons/ai";
import "./style.css"
import ResizeIndicator from '../../components/ResizeIndicator';

const startJson: Screen[] = appData.screens as unknown as Screen[];
const queriesData: Query[] = appData.queries as unknown as Query[];

const ScreenPanel = () => {
  const { screens, initScreens, interfaceView, setInterfaceView, queries, setQueries, selectedScreenIndex, selectedComponent, setSelectedComponent, updateComponent, addComponent, updateProperties, getFromLocalStorage, getQueriesFromLocalStorage, propertySidebar, leftSidebar, togglePropertySidebar, toggleLeftSidebar, addScreen, selectScreen, deleteComponent, onDragEnd, onPropertyUpdate, evaluateFormula, getComponentSuggestions, saveQueriesToLocalStorage, listener, getUsedComponents } = useComponentContext();
  const { isOver, setNodeRef } = useDroppable({ id: 'drop-container' });


  console.log("555555", selectedScreenIndex, screens);

  const GRIDCOUNT = 24;

  console.log("interfaceView", interfaceView);

  const currentScreen = screens[selectedScreenIndex];
  console.log("currentScreen", currentScreen)
  const listStyle: React.CSSProperties = {
    height: "100vh",
    width: (interfaceView || "mobile") == "mobile" ? "400px" : '100%',
    position: 'relative',
    msOverflowY: 'auto',
  };

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

  const [width, setWidth] = React.useState(0);

  const getCurrentScreenComponents = () => {
    return currentScreen.body.filter((component) => !component.parentId);
  };

  const updateAllSizes = () => {
    console.log("in update all sizes", rndGridList);
    if (ref.current) {
      var wSize = ref.current.offsetWidth / GRIDCOUNT
      rndRefs.current.forEach((rndRef) => {
        if (rndRef) {
          let grid = rndRef.props.grid;
          let id = rndRef.props.cmpId;
          rndRef.updatePosition({ x: (grid.desktop?.x || 0) * (wSize), y: (grid.desktop?.y || 0) * 10 });
          rndRef.updateSize({ width: ((grid.desktop?.width || 1) * (100 / GRIDCOUNT)) + '%', height: ((grid.desktop?.height || 10) * 10) + 'px' });
        }
      });
    }
  };


  React.useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        let currentWidth = ref.current.offsetWidth;
        !width && setWidth(ref.current.offsetWidth);
        setIsResChanged(true);
        if (rndRefs.current && currentWidth) {
          updateAllSizes();
        }
        setGridWSize(ref.current.offsetWidth / GRIDCOUNT);
      }
    };
    updateWidth();
    // Add resize event listener
    window.addEventListener("resize", updateWidth);
    // Cleanup event listener on unmount
    return () => {
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
          initScreens(startJson);
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


  return (
    <ChangeTrackerProvider>
      <div
        ref={(node) => {
          setNodeRef(node);
          drawingRef.current = node;
        }}
        className={`h-full w-full bg-gray-100 ${isOver ? 'bg-gray-200' : ''}`}
        style={listStyle}
        onMouseDown={startDrawing}
        id='screen-drop-container'
      >
        <div className={`list flex items-center relative justify-center mx-auto overflow-auto w-ful flex-col screen_panel ${isOver || isMovement ? "panel_grid" : ""}`} style={listStyle} ref={ref}>
          {width && getCurrentScreenComponents().map((component, index) => {
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

            return (
              <Rnd
                ref={(el) => {
                  rndRefs.current[index] = el;
                }}

                key={component.id}
                cmpId={component.id}
                grid={grid}
                default={{
                  x: (grid.desktop?.x || 0) * (gridWSize),
                  y: (grid.desktop?.y || 0) * 10,
                  width: ((grid.desktop?.width || 1) * (100 / GRIDCOUNT)) + '%',
                  height: ((grid.desktop?.height || 10) * 10) + 'px',
                }}
                minWidth={width / GRIDCOUNT}
                // minHeight={20}
                resizeGrid={[gridWSize, 10]}
                dragGrid={[gridWSize, 10]}
                bounds="parent"
                onDragStart={handleDragStart}
                onDragStop={(e, data) => {
                  setIsMovement(false);
                  console.log("on drag stop", data.x, data.y);

                  // 🔧 CHECK: Only process if there was actual dragging (not just a click)
                  if (Math.abs(data.deltaX) < 5 && Math.abs(data.deltaY) < 5) {
                    console.log("ScreenPanel onDragStop: No significant movement (likely a click) - skipping");
                    return;
                  }
                  //if(data.deltaX === 0 && data.deltaY === 0) return;

                  let gridWidthSize = (width / GRIDCOUNT);
                  let gridWidth = Math.round(data.node.clientWidth / gridWidthSize);
                  let gridHeight = Math.round(data.node.clientHeight / 10);

                  let gridX = Math.round(data.x / gridWidthSize);
                  let gridY = Math.round(data.y / 10);
                  delete component.parentId;
                  const updatedComponent = {
                    ...component, grid: {
                      desktop: {
                        ...component.grid.desktop,
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      },
                      mobile: { // Retain the existing mobile grid
                        ...component.grid.mobile,
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      },
                    }, position: { x: data.x, y: data.y }
                  };
                  updateComponent(updatedComponent);
                  { console.log("component", getDefaultConfiguration(component.type)) }
                  handleDragEnd();
                }}
                onResizeStart={() => {
                  setIsMovement(true);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setIsMovement(false);
                  let gridWidthSize = (width / GRIDCOUNT);
                  let gridWidth = Math.round(ref.clientWidth / gridWidthSize);
                  let gridHeight = Math.round(ref.offsetHeight / 10);

                  let gridX = Math.round(position.x / gridWidthSize);
                  let gridY = Math.round(position.y / 10);

                  const updatedComponent = {
                    ...component,
                    grid: {
                      desktop: {
                        ...component.grid.desktop,
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      },
                      mobile: { // Retain the existing mobile grid
                        ...component.grid.mobile,
                        width: gridWidth,
                        height: gridHeight,
                        x: gridX,
                        y: gridY,
                      },
                    },
                    position,
                  };
                  updateComponent(updatedComponent);
                }}
                enableResizing={{ ...resizableConfig }}
              >
                <div
                  className={`relative border rounded-sm ${selectedComponent?.id === component.id ? 'border-blue-500' : 'border-gray-100'}`}
                  onClick={() => setSelectedComponent(component)}
                  style={{ height: "inherit" }}
                >
                  {selectedComponent?.id === component.id && <CustomHandle name={component._name} />}
                  <ResizeIndicator isSelected={selectedComponent?.id === component.id} />
                  <SafeRenderComponent component={component} updateProperties={updateProperties} />
                </div>
              </Rnd>
            )
          })}
          {currentRect && (
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
          )}
        </div>
      </div>
    </ChangeTrackerProvider>
  );
};

export default ScreenPanel;
