/**
 * testing secenario for component login input
 * should handle username typing correctly
 * should handle password typing correctly
 * should call login function when login button is clicked
 */
import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './LoginInput';
import store from '../states';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginInput login={() => {}} />
        </BrowserRouter>
      </Provider>,
    );
    const usernameInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(usernameInput, 'abdul11@gmail.com');

    // Assert
    expect(usernameInput).toHaveValue('abdul11@gmail.com');
  });
  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginInput login={() => {}} />
        </BrowserRouter>
      </Provider>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginInput login={mockLogin} />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'abdul11@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'abdul11@gmail.com',
      password: 'passwordtest',
    });
  });
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