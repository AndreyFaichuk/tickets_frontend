import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../../../../tests-utils';
import { LoginForm } from '../LoginForm';
import { LOGIN_FORM, LOGIN_FORM_COMPOSITE_NAMES } from '../constants';

describe('src/pages/LoginPage/components/LoginForm/LoginForm.tsx', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const emailErrorText = 'Enter a valid email.';
  const passwordErrorText = 'Password must be at least 8 characters';

  test('it renders', () => {
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const rootElement = screen.getByTestId(LOGIN_FORM.root);

    expect(rootElement).toBeInTheDocument();
  });

  test('it has email, password and remember me checkbox by default', () => {
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    const passwordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.password,
    );

    const rememberMeElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.isRememberMe,
    );

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(rememberMeElement).toBeInTheDocument();
  });

  test('it should throw error if click submit button with empty email and password', async () => {
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const submitElement = screen.getByTestId(LOGIN_FORM.submitButton);

    await act(async () => {
      fireEvent.click(submitElement);
    });

    await waitFor(() => {
      expect(screen.getByText(emailErrorText)).toBeInTheDocument();
      expect(screen.getByText(passwordErrorText)).toBeInTheDocument();
    });

    const emailErrorMessage = screen.getAllByText(emailErrorText);
    const passwordErrorMessage = screen.getAllByText(passwordErrorText);

    expect(emailErrorMessage.length).toBeGreaterThan(0);
    expect(passwordErrorMessage.length).toBeGreaterThan(0);

    expect(handleSubmit).not.toHaveBeenCalledOnce();
  });

  test('it should throw error if click submit button with invalid email and password values', async () => {
    const invalidEmail = 'invalid_email_string';
    const invalidPassword = '1234';

    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const submitElement = screen.getByTestId(LOGIN_FORM.submitButton);

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    const passwordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.password,
    );

    fireEvent.input(emailElement, { target: { value: invalidEmail } });
    fireEvent.input(passwordElement, { target: { value: invalidPassword } });

    await act(async () => {
      fireEvent.click(submitElement);
    });

    await waitFor(() => {
      expect(screen.getByText(emailErrorText)).toBeInTheDocument();
      expect(screen.getByText(passwordErrorText)).toBeInTheDocument();
    });

    const emailErrorMessage = screen.getByText(emailErrorText);
    const passwordErrorMessage = screen.getByText(passwordErrorText);

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalledOnce();
  });

  test('It should not throw an error if the submit button is clicked with correct email and password values', async () => {
    const correctEmail = 'example@gmail.com';
    const correctPassword = 'example1234';

    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const submitElement = screen.getByTestId(LOGIN_FORM.submitButton);

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    const passwordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.password,
    );

    fireEvent.change(emailElement, { target: { value: correctEmail } });
    fireEvent.change(passwordElement, { target: { value: correctPassword } });

    await act(async () => {
      fireEvent.click(submitElement);
    });

    await waitFor(() => {
      expect(screen.queryByText(emailErrorText)).toBeNull();
      expect(screen.queryByText(passwordErrorText)).toBeNull();
    });

    expect(handleSubmit).toHaveBeenCalledOnce();
  });
});
