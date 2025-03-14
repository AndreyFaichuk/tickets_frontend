import { screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import { renderWithProviders } from '../../../tests-utils';
import { DefaultAppPage } from '../DefaultAppPage';

const handleGoBack = vi.fn();

vi.mock('../hooks/useGetBackMatcher', () => ({
  useGetBackMatcher: () => ({
    currentPage: 'Previous Page',
    handleGoBack,
  }),
}));

describe('src/app/DefaultAppPage/DefaultAppPage.tsx', () => {
  test('it renders the title', () => {
    renderWithProviders(
      <DefaultAppPage title="Test Title">Test Content</DefaultAppPage>,
    );

    const titleElement = screen.getByText('Test Title');

    expect(titleElement).toBeInTheDocument();
  });

  test('it renders the content', () => {
    renderWithProviders(
      <DefaultAppPage title="Test Title">Test Content</DefaultAppPage>,
    );

    const contentElement = screen.getByText('Test Content');

    expect(contentElement).toBeInTheDocument();
  });

  test('it renders the go back button when currentPage is present', () => {
    renderWithProviders(
      <DefaultAppPage title="Test Title">Test Content</DefaultAppPage>,
    );

    const goBackButton = screen.getByText('Previous Page');

    expect(goBackButton).toBeInTheDocument();
  });

  test('it handles go back button click', () => {
    renderWithProviders(
      <DefaultAppPage title="Test Title">Test Content</DefaultAppPage>,
    );

    const goBackButton = screen.getByText('Previous Page');
    fireEvent.click(goBackButton);

    expect(handleGoBack).toHaveBeenCalledTimes(1);
  });
});
