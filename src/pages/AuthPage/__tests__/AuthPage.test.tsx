import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import AuthPage from '../AuthPage';
import { renderWithProviders } from '../../../tests-utils';

describe('src/pages/AuthPage/AuthPage.tsx', () => {
  test('it renders', () => {
    renderWithProviders(<AuthPage />);

    const rootElement = screen.getByTestId('app-auth');

    expect(rootElement).toBeInTheDocument();
  });

  test('it has title and subtitle', () => {
    renderWithProviders(<AuthPage />);

    const titleElement = screen.getByTestId('base-auth-layout_title');
    const subTitleElement = screen.getByTestId('base-auth-layout_subtitle');

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test('it has first step of RegistrationForm by default', () => {
    renderWithProviders(<AuthPage />);

    const firstStepRegistrationFormlElement = screen.getByTestId(
      'registration-form-first-step_root',
    );

    expect(firstStepRegistrationFormlElement).toBeInTheDocument();
  });
});
