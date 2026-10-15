'use client';

import React from 'react';

interface State { hasError: boolean }

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8F4EE',
            color: '#2A1A2E',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
            Maris Stitches and Contour
          </h1>
          <p style={{ color: '#8A8078', marginBottom: '2rem' }}>
            Something went wrong loading this page.
          </p>
          <a
            href="/"
            style={{
              background: '#6B2D4F',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Reload page
          </a>
          <div style={{ marginTop: '2rem' }}>
            <a
              href="https://wa.me/2349029028384"
              style={{ color: '#6B2D4F', fontSize: '0.875rem' }}
            >
              Chat on WhatsApp instead →
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
