import { FC } from 'react';

import { Badge, Tooltip, TooltipProps, BadgeProps } from '@mui/material';

import {
  BADGE_ICON_MAPPER,
  BadgeVariants,
} from './BaseBadgeWithTooltip.constants';

type BaseBadgeWithTooltipProps = BadgeProps & {
  badgeVariant: BadgeVariants;
  count: React.ReactNode;
  placement?: TooltipProps['placement'];
};

export const BaseBadgeWithTooltip: FC<BaseBadgeWithTooltipProps> = ({
  count,
  badgeVariant,
  placement = 'top',
  color = 'info',
  title,
  ...restProps
}) => {
  return (
    <Tooltip title={badgeVariant} placement={placement}>
      <Badge color={color} badgeContent={count} {...restProps}>
        {BADGE_ICON_MAPPER[badgeVariant]}
      </Badge>
    </Tooltip>
  );
};
