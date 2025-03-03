import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './storeSelectors';

export type WorkspaceState = {
  currentWorkspaceId: string;
  workspaceInviteTokenAfterLogIn: string;
};

export type StoreActions = {
  setCurrentWorkspaceId: (id: string) => void;
  setWorkspaceInviteTokenAfterLogIn: (invite: string) => void;
  clearWorkspaceState: VoidFunction;
};

const initState: WorkspaceState = {
  currentWorkspaceId: '',
  workspaceInviteTokenAfterLogIn: '',
};

const workspaceStore = create<WorkspaceState & StoreActions>()(
  devtools((set) => ({
    ...initState,
    setCurrentWorkspaceId: (id: string) => {
      set({ currentWorkspaceId: id }, false, 'setCurrentWorkspaceId');
    },
    setWorkspaceInviteTokenAfterLogIn: (token: string) => {
      set(
        { workspaceInviteTokenAfterLogIn: token },
        false,
        'setWorkspaceInviteTokenAfterLogIn',
      );
    },
    clearWorkspaceState: () => {
      set(
        { workspaceInviteTokenAfterLogIn: '', currentWorkspaceId: '' },
        false,
        'clearWorkspaceState',
      );
    },
  })),
);

export const useWorkspaceStore = createSelectors(workspaceStore).use;
