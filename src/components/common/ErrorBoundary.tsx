import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SmileCraft ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleGoHome = () => {
    this.handleReset();
    window.location.hash = '';
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { sectionName } = this.props;

      return (
        <div className="py-16 px-6 max-w-xl mx-auto text-center my-8 rounded-2xl bg-[#fffdf9] border border-amber-200/80 shadow-md">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xl mb-4 shadow-xs">
            ⚠️
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">
            {sectionName ? `Unable to display ${sectionName}` : 'Something went wrong'}
          </h3>
          <p className="text-sm text-[#5d6b64] leading-relaxed mb-6">
            A small issue occurred while rendering this part of the page. You can try refreshing or returning to the homepage.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0e5c4a] text-white hover:bg-[#09382e] transition shadow-xs cursor-pointer"
            >
              Try again
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-100 text-[#1c2b26] hover:bg-stone-200 transition border border-stone-300 cursor-pointer"
            >
              Back to Home
            </button>
          </div>

          {this.state.error && (
            <details className="mt-6 text-left border-t border-stone-200/70 pt-4">
              <summary className="text-xs text-[#5d6b64] hover:text-[#0e5c4a] cursor-pointer font-medium select-none">
                Technical Details
              </summary>
              <pre className="mt-2 p-3 bg-stone-900 text-amber-200 rounded-lg text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
