import { ReactElement } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import { ValuesToType } from '@types';

export const DEFAULT_BADGE_VARIANTS = {
  attachments: 'attachments',
  comments: 'comments',
} as const;

export type BadgeVariants = ValuesToType<typeof DEFAULT_BADGE_VARIANTS>;

export const BADGE_ICON_MAPPER: Record<BadgeVariants, ReactElement> = {
  attachments: <AttachFileIcon />,
  comments: <MessageOutlinedIcon />,
};
