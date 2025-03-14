import { FC } from 'react';

import { Pagination, PaginationProps } from '@mui/material';

export const Paginator: FC<PaginationProps> = ({ ...rest }) => {
  return <Pagination {...rest} size="large" />;
};
