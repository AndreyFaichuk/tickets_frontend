import { StateCreator } from 'zustand';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PER_PAGE, PerPage } from './constants';

export type PaginationState = {
  currentPage: string;
  currentPerPage: PerPage;
  search: string;
};

export type PaginationSliceActions = {
  setCurrentPage: (currentPage: string) => void;
  setCurrentPerPage: (perPage: PerPage) => void;
  setSearch: (search: string) => void;
};

const initStatePagination: PaginationState = {
  currentPage: DEFAULT_CURRENT_PAGE,
  currentPerPage: DEFAULT_PER_PAGE.ten,
  search: '',
};

export type PaginationSlice = PaginationState & PaginationSliceActions;

export const workspacePaginationSlice: StateCreator<PaginationSlice> = (
  set,
) => ({
  ...initStatePagination,

  setCurrentPage: (currentPage: string) => set(() => ({ currentPage })),

  setCurrentPerPage: (currentPerPage: PerPage) =>
    set(() => ({ currentPerPage, currentPage: DEFAULT_CURRENT_PAGE })),

  setSearch: (search: string) =>
    set(() => ({ search, currentPage: DEFAULT_CURRENT_PAGE })),
});
