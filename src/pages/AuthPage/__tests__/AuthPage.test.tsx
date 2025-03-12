import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import AuthPage from '../AuthPage';
import { renderWithProviders } from '../../../tests-utils';
import { BASE_AUTH_LAYOUT_ID } from '../../../app/BaseAuthLayout/constants';

describe('src/pages/AuthPage/AuthPage.tsx', () => {
  test('it renders', () => {
    renderWithProviders(<AuthPage />);

    const rootElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.root);

    expect(rootElement).toBeInTheDocument();
  });

  test('it has title and subtitle', () => {
    renderWithProviders(<AuthPage />);

    const titleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.title);
    const subTitleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.subtitle);

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
