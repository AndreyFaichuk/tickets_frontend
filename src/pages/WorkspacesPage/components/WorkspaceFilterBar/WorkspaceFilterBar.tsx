import { ChangeEvent, FC } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material';

import { useWorkspacesFetch } from '@hooks/workspaces/useWorkspacesFetch';
import { DefaultPerPage } from '@shared/DefaultPerPage';
import { InputDebouncedValue } from '@shared/InputDebouncedValue';
import { Paginator } from '@shared/Paginator';
import { useWorkspaceStore } from '@stores/workspacesStore';

import { StyledWorkspaceFilterBarRoot } from './WorkspaceFilterBar.styled';

export const WorkspaceFilterBar: FC = () => {
  const { allWorkspaces } = useWorkspacesFetch();

  const search = useWorkspaceStore.search();
  const currentPerPage = useWorkspaceStore.currentPerPage();
  const amICreator = useWorkspaceStore.amICreator();

  const setSearch = useWorkspaceStore.setSearch();
  const setCurrentPage = useWorkspaceStore.setCurrentPage();
  const setCurrentPerPage = useWorkspaceStore.setCurrentPerPage();
  const setAmICreator = useWorkspaceStore.setAmICreator();
  const clearAllFilters = useWorkspaceStore.clearAllFilters();

  const shouldHidePaginator = allWorkspaces?.pagination.totalPages === 0;

  const handlePaginatorChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page.toString());
  };

  const handleAmICreatorChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setAmICreator(checked);
  };

  const handleClearAllFilters = () => {
    clearAllFilters();
  };

  return (
    <StyledWorkspaceFilterBarRoot>
      <DefaultPerPage
        currentPerPage={currentPerPage}
        setCurrentPerPage={setCurrentPerPage}
      />
      <Divider orientation="vertical" flexItem />

      <InputDebouncedValue
        value={search}
        setSearch={setSearch}
        label="Search by title"
      />
      <Divider orientation="vertical" flexItem />

      {!shouldHidePaginator && (
        <>
          <Paginator
            count={allWorkspaces?.pagination.totalPages ?? 1}
            page={allWorkspaces?.pagination.currentPage ?? 1}
            onChange={handlePaginatorChange}
          />
          <Divider orientation="vertical" flexItem />
        </>
      )}

      <FormControlLabel
        value="end"
        control={
          <Checkbox checked={amICreator} onChange={handleAmICreatorChange} />
        }
        label="My workspaces"
        labelPlacement="end"
      />
      <Divider orientation="vertical" flexItem />

      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="primary"
        onClick={handleClearAllFilters}>
        Clear all filters
      </Button>
    </StyledWorkspaceFilterBarRoot>
  );
};
