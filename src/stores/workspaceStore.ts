import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type WorkspaceState = {
  currentWorkspaceId: string;
};

export type StoreActions = {
  setCurrentWorkspaceId: (id: string) => void;
};

const initState: WorkspaceState = {
  currentWorkspaceId: '',
};

export const useWorkspaceStore = create<WorkspaceState & StoreActions>()(
  devtools((set) => ({
    ...initState,
    setCurrentWorkspaceId: (id: string) =>
      set({ currentWorkspaceId: id }, false, 'setCurrentWorkspaceId'),
  })),
);
