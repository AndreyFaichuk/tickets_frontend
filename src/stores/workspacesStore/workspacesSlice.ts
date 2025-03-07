import { StateCreator } from 'zustand';

export type WorkspaceState = {
  currentWorkspaceId: string;
  workspaceInviteTokenAfterLogIn: string;
};

export type WorkspacesStoreActions = {
  setCurrentWorkspaceId: (id: string) => void;
  setWorkspaceInviteTokenAfterLogIn: (invite: string) => void;
  clearWorkspaceState: VoidFunction;
};

const initWorkspaceState: WorkspaceState = {
  currentWorkspaceId: '',
  workspaceInviteTokenAfterLogIn: '',
};

export type WorkspaceSlice = WorkspaceState & WorkspacesStoreActions;

export const workspaceSlice: StateCreator<WorkspaceSlice> = (set) => ({
  ...initWorkspaceState,

  setCurrentWorkspaceId: (id: string) =>
    set(() => ({ currentWorkspaceId: id })),

  setWorkspaceInviteTokenAfterLogIn: (invite: string) =>
    set(() => ({ workspaceInviteTokenAfterLogIn: invite })),

  clearWorkspaceState: () =>
    set(() => ({
      currentWorkspaceId: '',
      workspaceInviteTokenAfterLogIn: '',
    })),
});
