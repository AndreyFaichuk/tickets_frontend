import { screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultDrawer } from '../DefaultDrawer';

vi.mock('../DefaultDrawer.hooks', () => ({
  useDefaultDrawerOptions: vi.fn(() => () => <div>Drawer Item</div>),
}));

describe('src/app/DefaultDrawer/DefaultDrawer.tsx', () => {
  test('it renders the drawer', () => {
    renderWithProviders(<DefaultDrawer />);

    const drawerElement = screen.getByTestId('default-drawer');

    expect(drawerElement).toBeInTheDocument();
  });

  test('it renders the drawer items', () => {
    renderWithProviders(<DefaultDrawer />);

    const drawerItem = screen.getByText('Drawer Item');

    expect(drawerItem).toBeInTheDocument();
  });

  test('it opens the drawer when the open button is clicked', () => {
    renderWithProviders(<DefaultDrawer />);

    const openButton = screen.getByTestId('open-drawer-button');
    fireEvent.click(openButton);

    const closeButton = screen.getByTestId('close-drawer-button');

    expect(closeButton).toBeInTheDocument();
  });

  test('it closes the drawer when the close button is clicked', () => {
    renderWithProviders(<DefaultDrawer />);

    const openButton = screen.getByTestId('open-drawer-button');
    fireEvent.click(openButton);

    const closeButton = screen.getByTestId('close-drawer-button');
    fireEvent.click(closeButton);

    expect(openButton).toBeInTheDocument();
  });
});
