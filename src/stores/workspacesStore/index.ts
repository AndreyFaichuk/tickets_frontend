import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PaginationSlice, workspacePaginationSlice } from './paginationSlice';
import { createSelectors } from '../storeSelectors';
import { WorkspaceSlice, workspaceSlice } from './workspacesSlice';

type WorkspaceStore = PaginationSlice & WorkspaceSlice;

const workspaceStore = create<WorkspaceStore>()(
  devtools((...a) => ({
    ...workspacePaginationSlice(...a),
    ...workspaceSlice(...a),
  })),
);

export const useWorkspaceStore = createSelectors(workspaceStore).use;
