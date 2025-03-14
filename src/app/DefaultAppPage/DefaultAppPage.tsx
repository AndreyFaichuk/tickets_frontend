import { FC } from 'react';

import { BasePage } from '../BasePage';

import { useGetBackMatcher } from './hooks/useGetBackMatcher';

type DefaultAppPageProps = {
  title: string;
  children: React.ReactNode;
};

export const DefaultAppPage: FC<DefaultAppPageProps> = ({
  title,
  children,
}) => {
  const { currentPage, handleGoBack } = useGetBackMatcher();

  return (
    <BasePage.Root>
      <BasePage.Header>
        {currentPage && (
          <BasePage.GoBack onClick={handleGoBack} text={currentPage} />
        )}
        <BasePage.Title title={title} />
      </BasePage.Header>
      <BasePage.Content>{children}</BasePage.Content>
    </BasePage.Root>
  );
};
