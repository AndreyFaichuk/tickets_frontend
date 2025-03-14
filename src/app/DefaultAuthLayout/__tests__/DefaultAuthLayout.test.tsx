import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultAuthLayout } from '../DefaultAuthLayout';

describe('src/app/DefaultAuthLayout/DefaultAuthLayout.tsx', () => {
  const title = 'Test Title';
  const subTitle = 'Test Subtitle';

  test('it renders the title and subtitle', () => {
    renderWithProviders(
      <DefaultAuthLayout title={title} subTitle={subTitle}>
        Test Content
      </DefaultAuthLayout>,
    );

    const titleElement = screen.getByText(title);
    const subTitleElement = screen.getByText(subTitle);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test('it renders the content', () => {
    renderWithProviders(
      <DefaultAuthLayout title={title} subTitle={subTitle}>
        Test Content
      </DefaultAuthLayout>,
    );

    const contentElement = screen.getByText('Test Content');

    expect(contentElement).toBeInTheDocument();
  });
});
