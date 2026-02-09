import React, { useEffect } from 'react';
import { RenderComponent } from './../container/ScreenPanel/renderComponent.tsx';
import { ChangeTrackerProvider } from './../context/ChangeTracker/ChangeTrackerContext';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import { CloseOutlined } from '@ant-design/icons';
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

const PreviewSidebar = ({ screen, isVisible, onClose,sidebarNavState }) => {
  const GRIDCOUNT = 24;
  const ref = React.useRef(null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps;
  const { setSidebarNavState } = useComponentContext();
  let { margin, padding, backgroundColor, borderRadius,position,heightOrWidth} = {
    ...defaultProps,
    ...screen.properties,
    ...{"position":sidebarNavState.position,"heightOrWidth":sidebarNavState.heightOrWidth}
  };
  console.log("position====",sidebarNavState)
  const isHorizontal = position === 'left' || position === 'right';
  const isLeftOrTop = position === 'left' || position === 'top';
  const screenPanelStyle = {
    // ...rest of your style logic...
  };
  return (
    <div style={screenPanelStyle}>
      {/* ...rest of your render logic... */}
    </div>
  );
};

export default PreviewSidebar;
