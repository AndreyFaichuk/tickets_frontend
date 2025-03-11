import { BASE_BACKEND_URL } from '../constants';
import {
  CreateWorkspaceValues,
  UpdateWorkspaceValues,
} from '../hooks/workspaces/useWorkspacesActions';

import { RawWorkspace } from '../pages/WorkspacesPage/WorkspacesPage.types';
import { PerPage, SortOption } from '../stores/workspacesStore/constants';
import { PaginatedData, PromiseAxiosResponse } from '../types';
import { securityAxios } from './securityAxios';

const WORKSPACE_URL = `${BASE_BACKEND_URL}/workspaces`;

type GetWorkspacesVariables = {
  currentPage: string;
  currentPerPage: PerPage;
  search: string;
  sort: SortOption;
  amICreator: boolean;
};

export class WorkspaceApi {
  static async getWorkspaces({
    currentPage,
    currentPerPage,
    search,
    sort,
    amICreator,
  }: GetWorkspacesVariables): Promise<PaginatedData<RawWorkspace[]>> {
    const url = new URL(`${WORKSPACE_URL}/all`);

    if (currentPage) {
      url.searchParams.append('page', currentPage.toString());
    }

    if (currentPerPage) {
      url.searchParams.append('limit', currentPerPage.toString());
    }

    if (search) {
      url.searchParams.append('search', search);
    }

    if (sort) {
      url.searchParams.append('sort', sort.toString());
    }

    if (amICreator) {
      url.searchParams.append('isCreator', amICreator.toString());
    }

    const response = await securityAxios.get(url.toString());
    return response.data;
  }

  static async createWorkspace(workspaceValues: CreateWorkspaceValues) {
    const response = await securityAxios.post(
      `${WORKSPACE_URL}/create`,
      workspaceValues,
    );

    return response.data;
  }

  static async updateWorkspace(workspaceValues: UpdateWorkspaceValues) {
    const response = await securityAxios.patch(`${WORKSPACE_URL}`, {
      workspaceValues,
    });

    return response.data;
  }

  static getWorkspace(id: string): PromiseAxiosResponse<RawWorkspace> {
    const response = securityAxios.get(`${WORKSPACE_URL}/${id}`);
    return response;
  }
}
