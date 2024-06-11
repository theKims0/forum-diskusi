import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './LoginInput';
import store from '../states';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

describe('LoginInput component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginInput login={() => {}} />
        </BrowserRouter>
      </Provider>,
    );

    // Ensure the component contains the email input
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    // Ensure the component contains the password input
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    // Ensure the component contains the login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    // Ensure the component contains the register link
    expect(screen.getByRole('link', { name: /register here/i })).toBeInTheDocument();
  });
});
