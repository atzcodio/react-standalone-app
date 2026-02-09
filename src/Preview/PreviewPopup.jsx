import React from 'react';
import { useComponentContext } from './../context/componentContext';
import { RenderComponent } from './../container/ScreenPanel/renderComponent.tsx';
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

const PreviewPopup = ({ screen, isVisible, onClose, popupNavState }) => {
  const GRIDCOUNT = 24;
  const ref = React.useRef(null);
  const [windowWidth, setWindowWith] = React.useState(0);
  let defaultProps = ScreenAsComponent.defaultProps || {};

  const {interfaceView} = useComponentContext()
  const popupHeight = popupNavState?.height || '400px';
  const popupWidth = popupNavState?.width || '400px';
  const parsedWidth = typeof popupWidth === 'string' && popupWidth && !popupWidth.includes('px') && !popupWidth.includes('%') && !isNaN(parseInt(popupWidth))
    ? parseInt(popupWidth) + 'px'
    : popupWidth || '400px';
  const parsedHeight = typeof popupHeight === 'string' && popupHeight && !popupHeight.includes('px') && !popupHeight.includes('%') && !isNaN(parseInt(popupHeight))
    ? parseInt(popupHeight) + 'px'
    : popupHeight || '400px';

  // ...rest of your render logic...

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      width={parsedWidth}
      style={{ height: parsedHeight }}
      footer={null}
    >
      {/* ...rest of your render logic... */}
    </Modal>
  );
};

export default PreviewPopup;
