import { screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { BasePage } from '../BasePage';

describe('src/app/BasePage/BasePage.tsx', () => {
  test('it renders root', () => {
    renderWithProviders(
      <BasePage.Root>
        <div>Test Content</div>
      </BasePage.Root>,
    );

    const rootElement = screen.getByText('Test Content');

    expect(rootElement).toBeInTheDocument();
  });

  test('it renders header', () => {
    renderWithProviders(
      <BasePage.Root>
        <BasePage.Header>
          <div>Header Content</div>
        </BasePage.Header>
      </BasePage.Root>,
    );

    const headerElement = screen.getByText('Header Content');

    expect(headerElement).toBeInTheDocument();
  });

  test('it renders title', () => {
    renderWithProviders(
      <BasePage.Root>
        <BasePage.Title title="Test Title" />
      </BasePage.Root>,
    );

    const titleElement = screen.getByText('Test Title');

    expect(titleElement).toBeInTheDocument();
  });

  test('it renders content', () => {
    renderWithProviders(
      <BasePage.Root>
        <BasePage.Content>
          <div>Page Content</div>
        </BasePage.Content>
      </BasePage.Root>,
    );

    const contentElement = screen.getByText('Page Content');

    expect(contentElement).toBeInTheDocument();
  });

  test('it handles go back button click', () => {
    const handleClick = vi.fn();

    renderWithProviders(
      <BasePage.Root>
        <BasePage.GoBack text="Go Back" onClick={handleClick} />
      </BasePage.Root>,
    );

    const buttonElement = screen.getByText('Go Back');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
