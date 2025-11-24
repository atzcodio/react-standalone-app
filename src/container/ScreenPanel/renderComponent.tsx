
import { ComponentMap } from '../../allComponents';
import { useComponentContext, Component, Screen } from './../../context/componentContext';
import ErrorBoundary from '../../components/ErrorBoundary';

/* updateAllProperties IS PASSED FROM HERE>> REAL DEFINITION */

interface Props {
  component: Component;
  _mode?: "preview" | "edit",
  _parentScreen?: Screen;
  updateProperties: (id: string, field: string, value: any) => void;
}

const RenderComponent = ({ component, _mode, _parentScreen }: Props) => {
  const { updateProperties, onFxChange } = useComponentContext();
  const ComponentToRender = ComponentMap[component.type] || null;

  return <ComponentToRender
    properties={component.properties || {}}
    id={component.id}
    grid={component.grid}
    _mode={_mode}
    _parentScreen={_parentScreen}
    updateProperties={updateProperties}
    meta={component.meta || {}}
    onFxChange={onFxChange}
  />;
};

// Safe wrapper that catches component render errors
const SafeRenderComponent = ({ component, _mode, _parentScreen }: Props) => {
  const handleComponentError = (error: Error, errorInfo: any) => {
    console.error(`Error in component "${component._name}" (${component.type}):`, error);

    // You can add additional error handling here:
    // - Send error to analytics
    // - Show toast notification
    // - Update global error state
  };

  const fallbackUI = (
    <div style={{
      padding: '12px',
      border: '2px dashed #ff6b6b',
      borderRadius: '6px',
      backgroundColor: '#fff5f5',
      color: '#d63031',
      fontSize: '12px',
      textAlign: 'center',
      minHeight: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '2px'
    }}>
      <div style={{ fontSize: '16px', marginBottom: '4px' }}>⚠️</div>
      <div style={{ fontWeight: 'bold' }}>{component._name}</div>
      <div style={{ opacity: 0.8 }}>Component Error</div>
    </div>
  );

  return (
    <ErrorBoundary
      componentName={component._name || component.type}
      onError={handleComponentError}
      fallback={fallbackUI}
      showDetails={_mode === "edit"} // Show error details only in edit mode
    >
      <RenderComponent
        component={component}
        _mode={_mode}
        _parentScreen={_parentScreen}
        updateProperties={() => { }} // This prop is not used since we get it from context
      />
    </ErrorBoundary>
  );
};


export {
  RenderComponent,
  SafeRenderComponent
}
