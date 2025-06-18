import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Basic test to ensure the App component renders
    // You would typically test for specific elements or functionality here
    expect(document.querySelector('.App')).toBeInTheDocument();
  });
});
