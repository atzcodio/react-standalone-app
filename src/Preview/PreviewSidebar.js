import React, { useEffect } from 'react';
import { RenderComponent } from './../container/ScreenPanel/renderComponent';
import { ChangeTrackerProvider } from './../context/ChangeTracker/ChangeTrackerContext';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import { CloseOutlined } from '@ant-design/icons';
import { useComponentContext } from '../context/componentContext';
// Default grid setup
const defaultGrid = {
  grid: {
    desktop: {
      height: 50,
      width: 1,
    },
    mobile: {
      height: 5,
      width: 10,
    },
  },
};

const PreviewSidebar = ({ screen, isVisible, onClose,sidebarNavState }) => {
  const GRIDCOUNT = 24;
  const ref = React.useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps;
    const { setSidebarNavState } = useComponentContext();
  
    let { margin, padding, backgroundColor, borderRadius,position,heightOrWidth} = {
      ...defaultProps,
      ...screen.properties,
      ...{"position":sidebarNavState.position,"heightOrWidth":sidebarNavState.heightOrWidth}
    };
    
    console.log("position====",sidebarNavState)
    // setSidebarNavState({});

  const isHorizontal = position === 'left' || position === 'right';
  const isLeftOrTop = position === 'left' || position === 'top';

  const screenPanelStyle = {
    height: isHorizontal ? '100%' : heightOrWidth,
    width: isHorizontal ? heightOrWidth : '100%',
    position: 'absolute',
    top: position === 'top' ? (isVisible ? 0 : '-300px') : position === 'bottom' ? undefined : 0,
    bottom: position === 'bottom' ? (isVisible ? 0 : '-300px') : undefined,
    left: position === 'left' ? (isVisible ? 0 : '-300px') : position === 'right' ? undefined : 0,
    right: position === 'right' ? (isVisible ? 0 : '-300px') : undefined,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
    padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    transition: isHorizontal
      ? 'left 0.3s ease-in-out, right 0.3s ease-in-out'
      : 'top 0.3s ease-in-out, bottom 0.3s ease-in-out',
    boxShadow: isHorizontal
      ? isLeftOrTop
        ? '2px 0 5px rgba(0, 0, 0, 0.1)'
        : '-2px 0 5px rgba(0, 0, 0, 0.1)'
      : isLeftOrTop
      ? '0 2px 5px rgba(0, 0, 0, 0.1)'
      : '0 -2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  React.useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        !windowWidth && setWindowWith(ref.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <ChangeTrackerProvider>
      <div style={screenPanelStyle}>
        <button onClick={onClose} className="absolute top-2 right-2 text-color-secondary z-10 cursor-pointer p-1">
          <CloseOutlined />
        </button>
        <div className="list flex flex-col items-start justify-start py-5">
          {screen.body
            .filter((component) => !component.parentId)
            .map((component) => {
              let grid = { ...defaultGrid.grid, ...component.grid };

              return (
                <div
                  key={component.id}
                  style={{
                    position: 'absolute',
                    left: (grid.desktop?.x || 0) * (100 / GRIDCOUNT) + '%',
                    top: (grid.desktop?.y || 0) * 10 + 'px',
                    width: '100%',
                    height: (grid.desktop?.height || 10) * 10 + 'px',
                  }}
                >
                  <RenderComponent component={component} _mode="preview" _parentScreen={screen} />
                </div>
              );
            })}
        </div>
      </div>
    </ChangeTrackerProvider>
  );
};


export default PreviewSidebar;
