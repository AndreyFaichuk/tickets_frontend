import { BASE_BACKEND_URL } from '@constants';
import { RawWorkspace } from '@pages/WorkspacesPage/WorkspacesPage.types';

import { securityAxios } from './securityAxios';

const INVITE_URL = `${BASE_BACKEND_URL}/invite`;

export class InviteApi {
  static async inviteNewMemberToWorkspace(
    token: string,
  ): Promise<RawWorkspace> {
    const queryParams = new URLSearchParams();

    if (token) {
      queryParams.append('token', token);
    }

    const response = await securityAxios.get(
      `${INVITE_URL}?${queryParams.toString()}`,
    );

    return response.data;
  }
}
