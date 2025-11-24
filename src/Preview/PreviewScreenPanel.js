import React from 'react';
import { useComponentContext } from './../context/componentContext';  // Import context to access components
//import { RenderComponent } from './../RenderComponent';  // Import your rendering logic for components
import { RenderComponent } from './../container/ScreenPanel/renderComponent';
import { useParams } from 'react-router-dom';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import PreviewHeader from './PreviewHeader';
import MBridgeDemo from '../MBridgeDemo';
import MBridge from '../MBridge';

// PreviewScreenPanel component renders the components for a screen without drag-and-drop

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


const PreviewScreenPanel = ({ screen, sidebar }) => {
  const { interfaceView, screens } = useComponentContext();
  //   const currentScreen = screens[selectedScreenIndex];
  const GRIDCOUNT = 24;
  const ref = React.useRef < HTMLDivElement > (null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps;

  let { margin, padding, backgroundColor, borderRadius, header } = { ...defaultProps, ...screen.properties };
  console.log("background color in preview changes", backgroundColor);

  let screenWidth = interfaceView == "mobile" ? "400px" : "100%";
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
    screenPanelStyle["width"] = interfaceView == "mobile" && screen.type == "screen" ? "400px" : "100%";
    screenPanelStyle["marginLeft"] = interfaceView == "mobile" && screen.type == "screen" ? "calc(calc((100% - 400px) / 2))" : "0"
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
    // Add resize event listener
    window.addEventListener("resize", updateWidth);
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);


  const { screenId } = useParams();
  console.log("🔍 PreviewScreenPanel Debug:", {
    screenId: screenId, 
    screen: screen,
    screenBody: screen?.body,
    componentsCount: screen?.body?.length,
    headerScreen: headerScreen,
    interfaceView: interfaceView
  });
  
  const takePhoto = async () => {
    try {
      const photo = await MBridge.camera.takePhoto({ quality: 80, saveToGallery: false });  
      console.log("Photo taken:", photo);
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
          paddingTop: headerScreen ? '80px' : listStyle.padding.split(' ')[0] // Add top padding if header exists
        }}
      >

        {screen.body.filter((component) => !component.parentId).map((component) => {
          let grid = { ...defaultGrid.grid, ...component.grid };
          let currentGridSP = interfaceView === "mobile" ? grid.mobile : grid.desktop;
          
          console.log("🔍 Rendering component:", {
            componentId: component.id,
            componentType: component.type,
            componentName: component._name,
            grid: currentGridSP,
            hasParentId: !!component.parentId
          });
          
          return (
            <div
              key={component.id}
              style={{
                position: 'absolute',
                left: (currentGridSP?.x || 0) * (100 / GRIDCOUNT) + '%',
                top: ((currentGridSP?.y || 0) * 10) + 'px',
                width: ((currentGridSP?.width || 1) * (100 / GRIDCOUNT)) + '%',
                height: ((currentGridSP?.height || 10) * 10) + 'px',
              }}
            >
              <RenderComponent component={component} _mode="preview" _parentScreen={screen} />
            </div>
            
          )
        })}
        {/* <button style={{ padding: "20px",backgroundColor:"red", "marginTop": "40px" }} onClick={takePhoto}>Take Photo</button> */}

        {sidebar}
      </div>
    </div>
  );
};

export default PreviewScreenPanel;
