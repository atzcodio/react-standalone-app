// Global Error Logger for LowCodeStudio
import { ErrorInfo } from 'react';

export interface ErrorReport {
  id: string;
  timestamp: string;
  componentName?: string;
  error: {
    message: string;
    stack?: string;
    name: string;
  };
  errorInfo?: {
    componentStack: string;
  };
  context: {
    userAgent: string;
    url: string;
    mode?: 'edit' | 'preview';
    componentId?: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorLogger {
  private errors: ErrorReport[] = [];
  private maxErrors = 100; // Limit stored errors to prevent memory issues
  private listeners: ((error: ErrorReport) => void)[] = [];

  // Add error to the log
  logError(
    error: Error, 
    errorInfo?: ErrorInfo, 
    componentName?: string,
    componentId?: string,
    mode?: 'edit' | 'preview'
  ): ErrorReport {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      componentName,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo: errorInfo ? {
        componentStack: errorInfo.componentStack || ''
      } : undefined,
      context: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        mode,
        componentId
      },
      severity: this.determineSeverity(error, componentName)
    };

    // Add to internal storage
    this.errors.unshift(errorReport);
    
    // Limit storage size
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Notify listeners
    this.listeners.forEach(listener => {
      try {
        listener(errorReport);
      } catch (listenerError) {
        console.error('Error in error logger listener:', listenerError);
      }
    });

    // Console logging based on severity
    this.logToConsole(errorReport);

    // Send to external service if configured
    this.sendToExternalService(errorReport);

    return errorReport;
  }

  // Subscribe to error events
  onError(listener: (error: ErrorReport) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Get all errors
  getErrors(filter?: Partial<Pick<ErrorReport, 'severity' | 'componentName'>>): ErrorReport[] {
    if (!filter) return [...this.errors];

    return this.errors.filter(error => {
      if (filter.severity && error.severity !== filter.severity) return false;
      if (filter.componentName && error.componentName !== filter.componentName) return false;
      return true;
    });
  }

  // Clear errors
  clearErrors(): void {
    this.errors = [];
  }

  // Get error summary
  getSummary(): {
    total: number;
    bySeverity: Record<string, number>;
    byComponent: Record<string, number>;
    recent: ErrorReport[];
  } {
    const bySeverity: Record<string, number> = {};
    const byComponent: Record<string, number> = {};

    this.errors.forEach(error => {
      // Count by severity
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
      
      // Count by component
      const component = error.componentName || 'Unknown';
      byComponent[component] = (byComponent[component] || 0) + 1;
    });

    return {
      total: this.errors.length,
      bySeverity,
      byComponent,
      recent: this.errors.slice(0, 5) // Last 5 errors
    };
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private determineSeverity(error: Error, componentName?: string): ErrorReport['severity'] {
    // Critical errors that break core functionality
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return 'critical';
    }

    // High severity for render errors
    if (error.name === 'TypeError' && error.message.includes('Cannot read')) {
      return 'high';
    }

    // Medium severity for component-specific errors
    if (componentName && !componentName.includes('Unknown')) {
      return 'medium';
    }

    // Default to low severity
    return 'low';
  }

  private logToConsole(errorReport: ErrorReport): void {
    const { severity, componentName, error } = errorReport;
    
    const logMethod = severity === 'critical' || severity === 'high' ? 'error' : 
                     severity === 'medium' ? 'warn' : 'log';
    
    console[logMethod](
      `🚨 [${severity.toUpperCase()}] ${componentName || 'Component'} Error:`,
      error.message,
      errorReport
    );
  }

  private async sendToExternalService(errorReport: ErrorReport): Promise<void> {
    // Only send high and critical errors to external service
    if (errorReport.severity === 'low') return;

    try {
      // You can integrate with external error reporting services here
      // Examples: Sentry, LogRocket, Bugsnag, etc.
      
      // Example implementation:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // });
      
      console.log('Error would be sent to external service:', errorReport);
    } catch (sendError) {
      console.error('Failed to send error to external service:', sendError);
    }
  }
}

// Global instance
export const errorLogger = new ErrorLogger();

// React hook for using error logger
export const useErrorLogger = () => {
  const logError = (
    error: Error,
    componentName?: string,
    componentId?: string
  ) => {
    return errorLogger.logError(error, undefined, componentName, componentId, 'edit');
  };

  return {
    logError,
    getErrors: errorLogger.getErrors.bind(errorLogger),
    getSummary: errorLogger.getSummary.bind(errorLogger),
    clearErrors: errorLogger.clearErrors.bind(errorLogger),
    onError: errorLogger.onError.bind(errorLogger)
  };
};

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  errorLogger.logError(
    new Error(event.message),
    undefined,
    'GlobalErrorHandler',
    undefined,
    'edit'
  );
});

window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason instanceof Error ? 
    event.reason : 
    new Error(String(event.reason));
    
  errorLogger.logError(
    error,
    undefined,
    'UnhandledPromise',
    undefined,
    'edit'
  );
});

export default errorLogger;