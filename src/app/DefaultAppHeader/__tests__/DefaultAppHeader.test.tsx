import { screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultAppHeader } from '../DefaultAppHeader';

describe('src/app/DefaultAppHeader/DefaultAppHeader.tsx', () => {
  test('it renders the logo', () => {
    renderWithProviders(<DefaultAppHeader />);

    const logoElement = screen.getByAltText('logo');

    expect(logoElement).toBeInTheDocument();
  });
});
