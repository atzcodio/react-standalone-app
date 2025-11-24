import React from 'react';

interface ResizeIndicatorProps {
  isSelected: boolean;
}

const ResizeIndicator: React.FC<ResizeIndicatorProps> = ({ isSelected }) => {
  if (!isSelected) return null;

  const dotStyle = {
    position: 'absolute' as const,
    width: '10px',
    height: '10px',
    backgroundColor: '#4096ff',
    borderRadius: '50%',
    border: '1px solid #fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    pointerEvents: 'none' as const,
    zIndex: 10,
  };

  const edgeHandleStyle = {
    position: 'absolute' as const,
    backgroundColor: '#4096ff',
    border: '1px solid #fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    pointerEvents: 'none' as const,
    zIndex: 10,
  };

  const top = "-5px", right = "-5px", left = "-5px", bottom = "-5px";
  const tbHeight = "6px";
  const lrHeight = "20px";
  const tbWidth = "20px";
  const lrWidth = "6px";
  const transformX = "translateX(-50%)", transformY = "translateY(-50%)";

  const cornerDots = [
    // Top-left corner
    { top, left },
    // Top-right corner
    { top, right },
    // Bottom-left corner
    { bottom, left },
    // Bottom-right corner
    { bottom, right },
  ];

  const edgeHandles = [
    // Top center
    { top, left: "50%", transform: transformX, width: tbWidth, height: tbHeight },
    // Bottom center
    { bottom, left: "50%", transform: transformX, width: tbWidth, height: tbHeight },
    // Left center
    { left, top: "50%", transform: transformY, width: lrWidth, height: lrHeight },
    // Right center
    { right, top: "50%", transform: transformY, width: lrWidth, height: lrHeight },
  ];

  
  return (
    <>
      {/* Corner dots */}
      {cornerDots.map((dotPosition, index) => (
        <div 
          key={`dot-${index}`}
          style={{
            ...dotStyle,
            ...dotPosition,
          }}
        />
      ))}

      {/* Edge handles */}
      {edgeHandles.map((handleStyle, index) => (
        <div 
          key={`handle-${index}`}
          style={{
            ...edgeHandleStyle,
            borderRadius: "3px",
            ...handleStyle,
          }}
        />
      ))}
       
    </>
  );
};

export default ResizeIndicator;