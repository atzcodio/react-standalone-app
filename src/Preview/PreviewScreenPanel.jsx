import React from 'react';
import { useComponentContext } from './../context/componentContext';
import { RenderComponent } from './../container/ScreenPanel/renderComponent.tsx';
import { useParams } from 'react-router-dom';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import PreviewHeader from './PreviewHeader.jsx';
import MBridgeDemo from '../MBridgeDemo';
import MBridge from '../MBridge';

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

const PreviewScreenPanel = ({ screen, sidebar, screenWidth }) => {
  const { interfaceView, screens, updateProperties, onFxChange } = useComponentContext();
  const GRIDCOUNT = 24;
  const ref = React.useRef < HTMLDivElement > (null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps;

  let { margin, padding, backgroundColor, borderRadius, header } = { ...defaultProps, ...screen.properties };
  console.log("background color in preview changes", backgroundColor);

  let headerScreen = null;
  if (header) {
    headerScreen = screens.find((scr) => scr.id === header)
  }
  const screenPanelStyle = {
    height: "100vh",
    width: '100%',
    position: 'relative',
    overflow: 'auto',
  };

  if (screen.type == "screen") {
    screenPanelStyle["boxShadow"] = "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px";
  }

  if (interfaceView == "mobile") {
    screenPanelStyle["display"] = "flex";
    screenPanelStyle["justifyContent"] = "center";
    screenPanelStyle["alignItems"] = "center";
    screenPanelStyle["flexDirection"] = "column";
    screenPanelStyle["width"] = "100%";
    screenPanelStyle["marginLeft"] = "0px";
  }

  const listStyle = {
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
    padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    height: "100vh",
    width: screenWidth,
    minHeight: "100vh"
  }

  React.useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        !windowWidth && setWindowWith(ref.current.offsetWidth);
        console.log("Updated width:", ref.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [windowWidth]);

  const takePhoto = async () => {
    try {
      // ...photo logic...
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  return (
    <div className="w-full bg-gray-100" style={screenPanelStyle}>
      {screen.type === 'screen' && headerScreen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <PreviewHeader screen={headerScreen} isVisible={headerScreen !== null} />
        </div>
      )}
      <div
        className="list flex items-center relative justify-center mx-auto py-5 w-full flex-col"
        style={{
          ...listStyle,
          paddingTop: headerScreen ? '80px' : listStyle.padding.split(' ')[0]
        }}
      >
        {/* Render all components in the screen body */}
        {Array.isArray(screen.body) && screen.body.length > 0 ? (
          screen.body.map((component) => (
            <RenderComponent
              key={component.id}
              component={component}
              _mode="preview"
              _parentScreen={screen}
              updateProperties={updateProperties}
              onFxChange={onFxChange}
            />
          ))
        ) : (
          <div style={{ color: '#888', textAlign: 'center', width: '100%' }}>
            No components to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewScreenPanel;
