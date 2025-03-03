import { useEffect } from 'react';
import { useWorkspaceStore } from '../../../stores/workspaceStore';

export const useCurrentWorkspaceSync = () => {
  const setCurrentWorkspaceId = useWorkspaceStore.setCurrentWorkspaceId();

  const handleSetWorkspaceIdToLocalStorage = (id: string) => {
    localStorage.setItem('currentWorkspaceId', id);
    setCurrentWorkspaceId(id);
  };

  const handleRemoveWorkspaceIdFromLocalStorage = () => {
    localStorage.removeItem('currentWorkspaceId');
  };

  useEffect(() => {
    const storedWorkspaceId = localStorage.getItem('currentWorkspaceId');
    if (storedWorkspaceId) {
      setCurrentWorkspaceId(storedWorkspaceId);
    }
  }, [setCurrentWorkspaceId]);

  return {
    handleSetWorkspaceIdToLocalStorage,
    handleRemoveWorkspaceIdFromLocalStorage,
  };
};
