import { RawWorkspace, Workspace } from './WorkspacesPage.types';

export const getNormalizeWorkspaces = (
  rawWorkspaces: RawWorkspace[],
): Workspace[] => {
  return rawWorkspaces.map((rawWorkspace) => {
    const { avatarUrl, firstName, lastName, _id } = rawWorkspace.creator;

    return {
      inviteToken: rawWorkspace.inviteToken,
      createdAt: rawWorkspace.created_at,
      creator: {
        avatarUrl,
        firstName,
        lastName,
        userId: _id,
      },
      id: rawWorkspace._id,
      title: rawWorkspace.title,
      totalColumns: rawWorkspace.totalColumns,
      totalTickets: rawWorkspace.totalTickets,
      members: rawWorkspace.members.map((rawMember) => {
        const { avatarUrl, firstName, lastName, _id } = rawMember;

        return {
          userId: _id,
          avatarUrl,
          firstName,
          lastName,
        };
      }),
    };
  });
};
