import { screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';

import { useGetCurrentUser } from '@hooks/user/useGetCurrentUser';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultUserMenu } from '../DefaultUserMenu';
import { useDefaultUserMenuOptions } from '../DefaultUserMenu.hooks';

vi.mock('@hooks/user/useGetCurrentUser', () => ({
  useGetCurrentUser: vi.fn(),
}));

vi.mock('../DefaultUserMenu.hooks', () => ({
  useDefaultUserMenuOptions: vi.fn(),
}));

const mockUseGetCurrentUser = vi.mocked(useGetCurrentUser);
const mockUseDefaultUserMenuOptions = vi.mocked(useDefaultUserMenuOptions);

describe('src/app/DefaultUserMenu/DefaultUserMenu.tsx', () => {
  beforeEach(() => {
    mockUseGetCurrentUser.mockReturnValue({
      currentUser: {
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'avatar-url',
        email: 'john.doe@example.com',
        country: 'USA',
        dateOfBirth: new Date('1990-01-01'),
        _id: '12345',
      },
      isCurrentUserLoading: false,
    });

    mockUseDefaultUserMenuOptions.mockReturnValue(() => [
      <div key="menu-item">Menu Item</div>,
    ]);
  });

  test('it opens the menu when the avatar is clicked', () => {
    renderWithProviders(<DefaultUserMenu />);

    const avatar = screen.getByAltText('Remy Sharp');
    fireEvent.click(avatar);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  test('it renders the user email and menu items', () => {
    renderWithProviders(<DefaultUserMenu />);

    const avatar = screen.getByAltText('Remy Sharp');
    fireEvent.click(avatar);

    const email = screen.getByText('john.doe@example.com');
    const menuItem = screen.getByText('Menu Item');

    expect(email).toBeInTheDocument();
    expect(menuItem).toBeInTheDocument();
  });
});
