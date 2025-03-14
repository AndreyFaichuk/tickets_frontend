import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultPublicAppLayout } from '../DefaultPublicAppLayout';

describe('src/app/DefaultPublicAppLayout/DefaultPublicAppLayout.tsx', () => {
  test('it renders the content', () => {
    renderWithProviders(
      <DefaultPublicAppLayout>
        <div>Test Content</div>
      </DefaultPublicAppLayout>,
    );

    const contentElement = screen.getByText('Test Content');

    expect(contentElement).toBeInTheDocument();
  });

  test('it renders the page content container', () => {
    renderWithProviders(
      <DefaultPublicAppLayout>
        <div>Test Content</div>
      </DefaultPublicAppLayout>,
    );

    const pageContentElement = screen.getByTestId('app-content');

    expect(pageContentElement).toBeInTheDocument();
  });
});
