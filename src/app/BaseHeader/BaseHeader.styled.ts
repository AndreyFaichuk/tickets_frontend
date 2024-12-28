import { Box, styled } from '@mui/material';

export const StyledBaseHeaderRoot = styled('header')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: '65px',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  background: theme.palette.common.white,
  padding: theme.spacing(1.25, 2.5),
  boxShadow: '0 2px 2px rgba(28, 54, 73, 0.11079)',
  zIndex: 1,
  backgroundColor: theme.palette.primary.light,
  gap: theme.spacing(4),
}));

export const StyledBaseHeaderLogo = styled(Box)(() => ({
  display: 'block',
  width: '62px',
  height: '62px',
  cursor: 'pointer',
}));

export const StyledBaseHeaderLogoImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

export const StyledBaseHeaderSection = styled(Box)(() => ({}));
