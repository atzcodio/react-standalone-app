
import { useComponentContext } from '../context/componentContext';
import ScreenAsComponent from '../container/ScreenPanel/ScreenAsComponent';
import * as React from 'react';

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
  const ref = React.useRef(null);
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
    // ...rest of your style logic...
  };
  return (
    <div style={headerStyle} ref={ref}>
      {/* ...rest of your render logic... */}
    </div>
  );
};

export default PreviewHeader;
