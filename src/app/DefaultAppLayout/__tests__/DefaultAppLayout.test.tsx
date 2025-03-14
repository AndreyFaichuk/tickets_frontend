import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultAppLayout } from '../DefaultAppLayout';

describe('src/app/DefaultAppLayout/DefaultAppLayout.tsx', () => {
  test('it renders the header', () => {
    renderWithProviders(<DefaultAppLayout>Test Content</DefaultAppLayout>);

    const headerElement = screen.getByAltText('logo');

    expect(headerElement).toBeInTheDocument();
  });

  test('it renders the drawer', () => {
    renderWithProviders(<DefaultAppLayout>Test Content</DefaultAppLayout>);

    const drawerElement = screen.getByTestId('default-drawer');

    expect(drawerElement).toBeInTheDocument();
  });

  test('it renders the content', () => {
    renderWithProviders(<DefaultAppLayout>Test Content</DefaultAppLayout>);

    const contentElement = screen.getByText('Test Content');

    expect(contentElement).toBeInTheDocument();
  });

  test('it renders the page content container', () => {
    renderWithProviders(<DefaultAppLayout>Test Content</DefaultAppLayout>);

    const pageContentElement = screen.getByTestId('app-content');

    expect(pageContentElement).toBeInTheDocument();
  });
});
