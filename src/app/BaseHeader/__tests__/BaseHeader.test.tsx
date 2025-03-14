import { screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { BaseHeader } from '../BaseHeader';

describe('src/app/BaseHeader/BaseHeader.tsx', () => {
  const logoSrc = 'test-logo.png';

  test('it renders', () => {
    renderWithProviders(
      <BaseHeader.Root>
        <BaseHeader.Logo logo={logoSrc} />
        <BaseHeader.Section>
          <div>Test Content</div>
        </BaseHeader.Section>
      </BaseHeader.Root>,
    );

    const rootElement = screen.getByTestId('app-header');

    expect(rootElement).toBeInTheDocument();
  });

  test('it renders logo', () => {
    renderWithProviders(
      <BaseHeader.Root>
        <BaseHeader.Logo logo={logoSrc} />
      </BaseHeader.Root>,
    );

    const logoElement = screen.getByAltText('logo');

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', logoSrc);
  });

  test('it handles logo click', () => {
    const handleClick = vi.fn();

    renderWithProviders(
      <BaseHeader.Root>
        <BaseHeader.Logo logo={logoSrc} onClick={handleClick} />
      </BaseHeader.Root>,
    );

    const logoElement = screen.getByAltText('logo');
    fireEvent.click(logoElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('it renders section content', () => {
    renderWithProviders(
      <BaseHeader.Root>
        <BaseHeader.Section>
          <div>Test Content</div>
        </BaseHeader.Section>
      </BaseHeader.Root>,
    );

    const contentElement = screen.getByText('Test Content');

    expect(contentElement).toBeInTheDocument();
  });
});
