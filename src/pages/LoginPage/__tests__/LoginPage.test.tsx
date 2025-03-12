import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { renderWithProviders } from '../../../tests-utils';
import LoginPage from '../LoginPage';
import { BASE_AUTH_LAYOUT_ID } from '../../../app/BaseAuthLayout/constants';
import { LOGIN_FORM } from '../components/LoginForm/constants';

describe('src/pages/LoginPage/LoginPage.tsx', () => {
  test('it renders', () => {
    renderWithProviders(<LoginPage />);

    const rootElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.root);

    expect(rootElement).toBeInTheDocument();
  });

  test('it has title and subtitle', () => {
    renderWithProviders(<LoginPage />);

    const titleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.title);
    const subTitleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.subtitle);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test('it has LoginForm by default', () => {
    renderWithProviders(<LoginPage />);

    const loginFormlElement = screen.getByTestId(LOGIN_FORM.root);

    expect(loginFormlElement).toBeInTheDocument();
  });
});
