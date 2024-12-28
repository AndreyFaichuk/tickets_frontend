import { Box, Stack, styled } from '@mui/material';

export const TodosRoot = styled(Box)(() => ({
  flex: 1,
}));

export const TodosStack = styled(Stack)(() => ({
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  flexDirection: 'row',
}));
