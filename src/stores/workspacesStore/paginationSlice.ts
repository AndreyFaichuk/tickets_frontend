import { StateCreator } from 'zustand';

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_OPTION,
  PerPage,
  SortOption,
} from './constants';

export type PaginationState = {
  currentPage: string;
  currentPerPage: PerPage;
  search: string;
  sort: SortOption;
  amICreator: boolean;
};

export type PaginationSliceActions = {
  setCurrentPage: (currentPage: string) => void;
  setCurrentPerPage: (perPage: PerPage) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortOption) => void;
  setAmICreator: (iAmCreator: boolean) => void;
  clearAllFilters: VoidFunction;
};

const initStatePagination: PaginationState = {
  currentPage: DEFAULT_CURRENT_PAGE,
  currentPerPage: DEFAULT_PER_PAGE.ten,
  search: '',
  sort: DEFAULT_SORT_OPTION.asc,
  amICreator: false,
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

  setSort: (sort: SortOption) => set(() => ({ sort })),

  setAmICreator: (amICreator: boolean) =>
    set(() => ({ amICreator, currentPage: DEFAULT_CURRENT_PAGE })),

  clearAllFilters: () =>
    set(() => ({
      currentPage: DEFAULT_CURRENT_PAGE,
      amICreator: false,
      search: '',
      currentPerPage: DEFAULT_PER_PAGE.ten,
    })),
});
