import { FC } from 'react';
import { DefaultPerPage } from '../../../../components/shared/DefaultPerPage';
import { Paginator } from '../../../../components/shared/Paginator';
import { StyledPaginatorWithPerPageRoot } from './PaginatorWithPerPage.styled';
import { PerPage } from '../../../../stores/workspacesStore/constants';

type PaginatorWithPerPageProps = {
  totalPages: number;
  currentPage: number;
  currentPerPage: PerPage;
  onPaginatorChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  setCurrentPerPage: (currentPerPage: PerPage) => void;
};

export const PaginatorWithPerPage: FC<PaginatorWithPerPageProps> = ({
  currentPage,
  totalPages,
  currentPerPage,
  onPaginatorChange,
  setCurrentPerPage,
}) => {
  return (
    <StyledPaginatorWithPerPageRoot>
      <DefaultPerPage
        currentPerPage={currentPerPage}
        setCurrentPerPage={setCurrentPerPage}
      />
      <Paginator
        count={totalPages}
        page={currentPage}
        onChange={onPaginatorChange}
      />
    </StyledPaginatorWithPerPageRoot>
  );
};
