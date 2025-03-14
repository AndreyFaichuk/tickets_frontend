import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { BASE_AUTH_LAYOUT_ID } from '@app/BaseAuthLayout/constants';

import { renderWithProviders } from '../../../tests-utils';
import { BaseAuthLayout } from '../BaseAuthLayout';

describe('src/app/BaseAuthLayout/BaseAuthLayout.tsx', () => {
  const title = 'Test Title';
  const subTitle = 'Test Subtitle';

  const content = 'Test Content';

  test('it renders', () => {
    renderWithProviders(
      <BaseAuthLayout.Root>
        <BaseAuthLayout.Title title={title} subTitle={subTitle} />
        <BaseAuthLayout.Content>
          <div>{content}</div>
        </BaseAuthLayout.Content>
      </BaseAuthLayout.Root>,
    );

    const rootElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.root);

    expect(rootElement).toBeInTheDocument();
  });

  test('it has title and subtitle', () => {
    renderWithProviders(
      <BaseAuthLayout.Root>
        <BaseAuthLayout.Title title={title} subTitle={subTitle} />
        <BaseAuthLayout.Content>
          <div>Test Content</div>
        </BaseAuthLayout.Content>
      </BaseAuthLayout.Root>,
    );

    const titleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.title);
    const subTitleElement = screen.getByTestId(BASE_AUTH_LAYOUT_ID.subtitle);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test('it renders content', () => {
    renderWithProviders(
      <BaseAuthLayout.Root>
        <BaseAuthLayout.Title title={title} subTitle={subTitle} />
        <BaseAuthLayout.Content>
          <div>{content}</div>
        </BaseAuthLayout.Content>
      </BaseAuthLayout.Root>,
    );

    const contentElement = screen.getByText(content);

    expect(contentElement).toBeInTheDocument();
  });
});
