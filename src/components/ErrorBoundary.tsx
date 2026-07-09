import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('T-Minus Dashboard crashed:', error, info.componentStack);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('t-minus-dashboard-storage');
    } catch {
      // localStorage may be unavailable (private browsing, etc.) — ignore.
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2147483000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0620',
          color: '#e8e6f5',
          fontFamily: 'system-ui, sans-serif',
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀💥</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Something went wrong loading your dashboard</h1>
          <p style={{ fontSize: 13.5, opacity: 0.7, lineHeight: 1.5, marginBottom: 20 }}>
            This is usually caused by saved dashboard data from an older version. Resetting will restore the default
            dashboard — any custom widgets or text you set up will be lost.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
              color: '#04030a',
              fontWeight: 700,
              border: 'none',
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Reset Dashboard
          </button>
        </div>
      </div>
    );
  }
}
