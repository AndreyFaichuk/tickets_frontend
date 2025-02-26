import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const StyledBaseTableRoot = styled(Table)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  tableLayout: 'fixed',
  width: '100%',
}));

export const StyledBaseTableHeader = styled(TableHead)(() => ({}));

export const StyledBaseTableRow = styled(TableRow)(() => ({}));

export const StyledBaseTableCell = styled(TableCell)(() => ({
  flex: 1,
  width: 'auto',
  textAlign: 'center',
}));

export const StyledBaseTableBody = styled(TableBody)(() => ({}));
