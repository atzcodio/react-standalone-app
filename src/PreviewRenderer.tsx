import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from './context';
import { ComponentMap } from './allComponents';

const PreviewRenderer: React.FC = () => {
  const { screenId } = useParams();
  const { screens, selectedScreen, setSelectedScreen } = useAppContext();

  const currentScreen = useMemo(() => {
    if (screenId) {
      return screens.find(screen => screen.id === screenId) || screens[0];
    }
    return selectedScreen || screens[0];
  }, [screenId, screens, selectedScreen]);

  React.useEffect(() => {
    if (currentScreen && currentScreen !== selectedScreen) {
      setSelectedScreen(currentScreen);
    }
  }, [currentScreen, selectedScreen, setSelectedScreen]);

  const renderComponent = (component: any) => {
    const ComponentToRender = ComponentMap[component.type];

    if (!ComponentToRender) {
      console.warn(`Component type "${component.type}" not found`);
      return <div key={component.id}>Component type "{component.type}" not found</div>;
    }

    return (
      <ComponentToRender
        key={component.id}
        id={component.id}
        properties={component.properties}
        updateProperties={component.updateProperties}
        grid={component.grid}
        meta={component.meta}
      />
    );
  };

  if (!currentScreen) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2>No screens available</h2>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentScreen.backgroundColor || '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {currentScreen.body && currentScreen.body.length > 0 ? (
          <div style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {currentScreen.body.map(renderComponent)}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h3>No components in this screen</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewRenderer;