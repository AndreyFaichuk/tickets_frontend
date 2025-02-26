import { useEffect } from 'react';
import { useWorkspaceStore } from '../../../stores/workspaceStore';

export const useCurrentWorkspaceSync = () => {
  const setCurrentWorkspaceId = useWorkspaceStore(
    (state) => state.setCurrentWorkspaceId,
  );

  const handleSetWorkspaceIdToLocalStorage = (id: string) => {
    localStorage.setItem('currentWorkspaceId', id);
    setCurrentWorkspaceId(id);
  };

  useEffect(() => {
    const storedWorkspaceId = localStorage.getItem('currentWorkspaceId');
    if (storedWorkspaceId) {
      setCurrentWorkspaceId(storedWorkspaceId);
    }
  }, [setCurrentWorkspaceId]);

  return { handleSetWorkspaceIdToLocalStorage };
};
