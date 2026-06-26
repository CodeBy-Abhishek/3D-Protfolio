'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <section className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Something went wrong</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            The portfolio hit a temporary rendering issue. Refresh the page to recover.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.message ? (
            <p className="mt-4 rounded-lg bg-black/30 p-3 text-left font-mono text-xs text-red-200">
              {this.state.message}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:bg-cyan-300"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </section>
      </main>
    );
  }
}