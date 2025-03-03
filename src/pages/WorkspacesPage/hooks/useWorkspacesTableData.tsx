import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Workspace } from '../WorkspacesPage.types';
import { useCurrentWorkspaceSync } from './useCurrentWorkspaceSync';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard ';
import { BASE_FRONTEND_URL } from '../../../constants';

export const useWorkspacesTableData = (): ColumnDef<Workspace>[] => {
  const navigate = useNavigate();

  const { handleSetWorkspaceIdToLocalStorage } = useCurrentWorkspaceSync();
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleRedirectToWorkspace = (workspaceId: string) => {
    handleSetWorkspaceIdToLocalStorage(workspaceId);
    navigate(`/app/${workspaceId}/todos`);
  };

  const handleCopySharingLink = (inviteToken: string) => {
    copyToClipboard(
      `${BASE_FRONTEND_URL}/app/workspaces/invite?token=${inviteToken}`,
    );
  };

  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ getValue }) => (
        <Typography variant="h6">{getValue<string>()}</Typography>
      ),
    },
    {
      accessorKey: 'creator',
      header: 'Creator',
      cell: ({ row }) => {
        const { avatarUrl, firstName, lastName } = row.original.creator;

        return (
          <Stack alignItems="center">
            <Tooltip title={`${firstName} ${lastName}`}>
              <Avatar src={avatarUrl} alt={firstName} />
            </Tooltip>
          </Stack>
        );
      },
    },
    {
      accessorKey: 'totalColumns',
      header: 'Columns',
      cell: ({ getValue }) => (
        <Typography variant="h6">{getValue<number>()}</Typography>
      ),
    },
    {
      accessorKey: 'totalTickets',
      header: 'Tickets',
      cell: ({ getValue }) => (
        <Typography variant="h6">{getValue<number>()}</Typography>
      ),
    },
    {
      accessorKey: 'members',
      header: 'Members',
      cell: ({ getValue }) => {
        const members = getValue<Workspace['members']>();

        if (!members.length)
          return <Typography variant="h6">No members yet</Typography>;

        return (
          <Stack direction="row" justifyContent="center">
            <AvatarGroup
              total={members.length}
              sx={{ justifyContent: 'flex-end' }}>
              {members.map((member) => (
                <Tooltip
                  key={member.userId}
                  title={`${member.firstName} ${member.lastName}`}>
                  <Avatar src={member.avatarUrl} alt={member.firstName} />
                </Tooltip>
              ))}
            </AvatarGroup>
          </Stack>
        );
      },
    },
    {
      accessorKey: '',
      header: 'Actions',
      cell: ({ row }) => {
        const { id, inviteToken } = row.original;

        const handleRedirect = () => handleRedirectToWorkspace(id);
        const handleCopyLink = () => handleCopySharingLink(inviteToken);

        return (
          <Stack direction="row" justifyContent="center" gap={2}>
            <Tooltip title="Go to the workspace">
              <IconButton
                aria-label="delete"
                size="medium"
                onClick={handleRedirect}>
                <ArrowForwardIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isCopied ? 'Copied!' : 'Copy sharing link'}>
              <IconButton
                aria-label="copy"
                size="medium"
                onClick={handleCopyLink}>
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
};
