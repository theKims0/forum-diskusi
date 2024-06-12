/**
 * testing secenario for component register input
 * should handle name typing correctly
 * should handle email typing correctly
 * should handle password typing correctly
 * should call register function when register button is clicked
 * renders correctly
 * should have a link to login
 */
import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterInput register={() => {}} />
      </BrowserRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterInput register={() => {}} />
      </BrowserRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Username');

    // Action
    await userEvent.type(emailInput, 'johndoe@example.com');

    // Assert
    expect(emailInput).toHaveValue('johndoe@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterInput register={() => {}} />
      </BrowserRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(
      <BrowserRouter>
        <RegisterInput register={mockRegister} />
      </BrowserRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'John Doe');
    const emailInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(emailInput, 'johndoe@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
  });

  it('renders correctly', () => {
    // Arrange
    const { container } = render(
      <BrowserRouter>
        <RegisterInput register={() => {}} />
      </BrowserRouter>,
    );

    // Assert
    expect(container).toMatchSnapshot();
  });

  it('should have a link to login', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterInput register={() => {}} />
      </BrowserRouter>,
    );

    // Assert
    const loginLink = await screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/');
  });
});
