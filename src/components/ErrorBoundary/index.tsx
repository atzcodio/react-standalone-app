import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorLogger } from '../../utils/errorLogger';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({ error, errorInfo });

    // Log to global error logger
    errorLogger.logError(
      error, 
      errorInfo, 
      this.props.componentName || 'Unknown',
      undefined, // componentId not available here
      'edit' // assume edit mode in ErrorBoundary
    );

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '16px',
          border: '2px dashed #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#d63031',
          fontFamily: 'Arial, sans-serif',
          margin: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '18px', marginRight: '8px' }}>⚠️</div>
            <strong>Component Error</strong>
          </div>
          
          <div style={{ fontSize: '14px', marginBottom: '12px' }}>
            {this.props.componentName ? 
              `The "${this.props.componentName}" component encountered an error.` :
              'A component encountered an error.'
            }
          </div>

          <button
            onClick={this.handleRetry}
            style={{
              padding: '6px 12px',
              backgroundColor: '#00b894',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              marginRight: '8px'
            }}
          >
            Retry Component
          </button>

          {this.props.showDetails && this.state.error && (
            <details style={{ marginTop: '12px', fontSize: '12px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details
              </summary>
              <div style={{ 
                backgroundColor: '#f8f9fa',
                padding: '8px',
                borderRadius: '4px',
                marginTop: '4px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                <div><strong>Error:</strong> {this.state.error.message}</div>
                {this.state.error.stack && (
                  <div style={{ marginTop: '8px' }}>
                    <strong>Stack Trace:</strong>
                    <pre style={{ fontSize: '10px', margin: '4px 0' }}>
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Hook version for functional components (catches some errors but not all)
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: any) => {
    console.error('Error caught by error handler:', error, errorInfo);
    
    // You can dispatch to a global error state or show a toast notification
    // Example:
    // dispatch({ type: 'ADD_ERROR', payload: { error, errorInfo } });
  };
};

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryConfig?: Partial<ErrorBoundaryProps>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary 
      componentName={Component.displayName || Component.name}
      {...errorBoundaryConfig}
    >
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};