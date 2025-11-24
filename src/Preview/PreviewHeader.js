

import React from 'react';
import { RenderComponent } from './../container/ScreenPanel/renderComponent';
import { ChangeTrackerProvider } from './../context/ChangeTracker/ChangeTrackerContext';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import { useComponentContext } from '../context/componentContext';


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

const PreviewHeader = ({ screen, isVisible }) => {

  const ref = React.useRef < HTMLDivElement > (null);
  const [windowWidth, setWindowWith] = React.useState(0);

  const { setHeaderNavState } = useComponentContext();
  let defaultProps = ScreenAsComponent.defaultProps;

  let { margin, padding, backgroundColor, borderRadius, headerheight, position, header } = {
    ...defaultProps,
    ...screen?.properties,
  };
  console.log("PreviewHeader Properties", margin, padding, backgroundColor, borderRadius, headerheight, position, header)

  const headerStyle = {
    height: headerheight,
    width: '100%',
    display: isVisible ? 'block' : 'none',
    // position: 'absolute',
    // top: position === 'top' ? (isVisible ? 0 : '-100px') : undefined,
    // bottom: position === 'bottom' ? (isVisible ? 0 : '-100px') : undefined,
    // left: 0,
    // top: 0,
    backgroundColor: backgroundColor,
    padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    transition: 'top 0.3s ease-in-out, bottom 0.3s ease-in-out',
    boxShadow: position === 'top' ? '0 2px 5px rgba(0, 0, 0, 0.1)' : '0 -2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const GRIDCOUNT = 24;

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
  console.log("screenheader", screen)
  return (
    <ChangeTrackerProvider>
      <div style={headerStyle}>
        <div className="list flex flex-row items-center justify-start py-3 px-5">
          {screen?.body
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
                    width: (grid.desktop?.width || 1) * (100 / GRIDCOUNT) + '%',
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

export default PreviewHeader;
