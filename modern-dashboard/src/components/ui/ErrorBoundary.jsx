import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Widget Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-dashed border-white/10 rounded-2xl opacity-50 text-[10px] uppercase font-black text-center text-slate-500">
          Componente no disponible
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
