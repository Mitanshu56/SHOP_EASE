import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-gray-500">
            We're sorry, but something unexpected happened.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Reload Page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}