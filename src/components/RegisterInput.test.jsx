import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  it('renders correctly and handles input changes and register', async () => {
    const registerMock = vi.fn();

    render(
      <BrowserRouter>
        <RegisterInput register={registerMock} />
      </BrowserRouter>,
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByRole('button', { name: /register/i });

    // Simulate user input
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Verify inputs have the correct values
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('johndoe@example.com');
    expect(passwordInput).toHaveValue('password123');

    // Simulate button click
    fireEvent.click(registerButton);

    // Verify the register function is called with the correct arguments
    expect(registerMock).toHaveBeenCalledWith({ name: 'John Doe', email: 'johndoe@example.com', password: 'password123' });

    // Verify the existence of the login link
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
  });
});
