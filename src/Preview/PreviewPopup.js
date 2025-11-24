import React from 'react';
import { useComponentContext } from './../context/componentContext';
import { RenderComponent } from './../container/ScreenPanel/renderComponent';
import { ChangeTrackerProvider } from './../context/ChangeTracker/ChangeTrackerContext';
import { useParams } from 'react-router-dom';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import { Modal } from 'antd';
import './indexPopup.css';

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

// PreviewPopup component renders the components for a screen in a popup/modal
const PreviewPopup = ({ screen, isVisible, onClose, popupNavState }) => {
  const GRIDCOUNT = 24;
  const ref = React.useRef(null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps || {};

  const {interfaceView} = useComponentContext()
  // Ensure proper width and height handling
  const popupHeight = popupNavState?.height || '400px';
  const popupWidth = popupNavState?.width || '400px';
  
  // Parse numeric values and ensure proper units
  const parsedWidth = typeof popupWidth === 'string' && popupWidth && !popupWidth.includes('px') && !popupWidth.includes('%') && !isNaN(parseInt(popupWidth))
    ? parseInt(popupWidth) + 'px'
    : popupWidth || '400px';
  const parsedHeight = typeof popupHeight === 'string' && popupHeight && !popupHeight.includes('px') && !popupHeight.includes('%') && !isNaN(parseInt(popupHeight))
    ? parseInt(popupHeight) + 'px'
    : popupHeight || '400px';

  let { margin = ['0px', '0px', '0px', '0px'], padding = ['0px', '0px', '0px', '0px'], backgroundColor = '#ffffff', borderRadius = ['0px', '0px', '0px', '0px'] } = {
    ...defaultProps,
    ...screen.properties
  };

  const screenPanelStyle = {
    height: parsedHeight,
    width: '100%',
    position: 'relative',
    msOverflowY: 'auto',
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
    padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
    margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
    minWidth: '100%',
    boxSizing: 'border-box'
  };

  React.useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        !windowWidth && setWindowWith(ref.current.offsetWidth);
        console.log('Popup updated width:', ref.current.offsetWidth, 'Modal width:', parsedWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [windowWidth, parsedWidth]);

  console.log('PreviewPopup render:', {
    popupNavState,
    parsedWidth,
    parsedHeight,
    screenProperties: screen?.properties,
    isVisible
  });

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={parsedWidth}
      centered
      className="custom-modal-class"
      style={{ 
        borderRadius: borderRadius ? `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}` : '0px', 
        overflow: 'hidden'
      }}
      bodyStyle={{
        padding: 0,
        width: '100%',
        height: parsedHeight,
        overflow: 'auto'
      }}
    >
      <ChangeTrackerProvider>
        <div 
          ref={ref}
          className="w-full bg-gray-100" 
          style={screenPanelStyle}
        >
          <div className="list flex items-center relative justify-center mx-auto py-5 w-full flex-col">
            {screen?.body
              ?.filter((component) => !component.parentId)
              .map((component) => {
                let grid = { ...defaultGrid.grid, ...component.grid };
                let currentGridSP = interfaceView === "mobile" ? grid.mobile : grid.desktop;
                return (
                  <div
                    key={component.id}
                    style={{
                      position: 'absolute',
                      left: (currentGridSP?.x || 0) * (100 / GRIDCOUNT) + '%',
                      top: (currentGridSP?.y || 0) * 10 + 'px',
                      width: (currentGridSP?.width || 1) * (100 / GRIDCOUNT) + '%',
                      height: (currentGridSP?.height || 10) * 10 + 'px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <RenderComponent 
                      component={component} 
                      _mode="preview" 
                      _parentScreen={screen}  
                    />
                  </div>
                );
              }) || []}
          </div>
        </div>
      </ChangeTrackerProvider>
    </Modal>
  );
};

export default PreviewPopup;
