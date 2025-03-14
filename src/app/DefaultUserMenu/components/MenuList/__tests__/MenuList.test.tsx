import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { renderWithProviders } from '../../../../../tests-utils';
import { MenuList } from '../MenuList';

describe('src/app/DefaultUserMenu/components/MenuList/MenuList.tsx', () => {
  test('it renders the children', () => {
    renderWithProviders(
      <MenuList>
        <div>Test Child</div>
      </MenuList>,
    );

    const childElement = screen.getByText('Test Child');

    expect(childElement).toBeInTheDocument();
  });

  test('it applies the correct styles', () => {
    renderWithProviders(
      <MenuList>
        <div>Test Child</div>
      </MenuList>,
    );

    const rootElement = screen.getByText('Test Child').parentElement;

    expect(rootElement).toHaveStyle('flex-direction: column');
    expect(rootElement).toHaveStyle('gap: 8px');
  });
});
