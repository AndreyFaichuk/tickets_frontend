import { FC } from 'react';
import { BaseAuthLayout } from '../BaseAuthLayout';

type DefaultAuthLayout = {
  title: string;
  subTitle: React.ReactNode;
  children: React.ReactNode;
};

export const DefaultAuthLayout: FC<DefaultAuthLayout> = ({
  children,
  subTitle,
  title,
}) => {
  return (
    <BaseAuthLayout.Root>
      <BaseAuthLayout.Title title={title} subTitle={subTitle} />
      <BaseAuthLayout.Content>{children}</BaseAuthLayout.Content>
    </BaseAuthLayout.Root>
  );
};
