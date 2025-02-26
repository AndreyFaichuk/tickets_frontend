import { TableCell, TableContainer, Paper } from '@mui/material';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

import {
  StyledBaseTableBody,
  StyledBaseTableCell,
  StyledBaseTableHeader,
  StyledBaseTableRoot,
  StyledBaseTableRow,
} from './BaseTable.styled';

type BaseTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
};

export const BaseTable = <T,>({ columns, data }: BaseTableProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper}>
      <StyledBaseTableRoot>
        <StyledBaseTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <StyledBaseTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledBaseTableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </StyledBaseTableCell>
              ))}
            </StyledBaseTableRow>
          ))}
        </StyledBaseTableHeader>
        <StyledBaseTableBody>
          {table.getRowModel().rows.map((row) => (
            <StyledBaseTableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledBaseTableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledBaseTableCell>
              ))}
            </StyledBaseTableRow>
          ))}
        </StyledBaseTableBody>
      </StyledBaseTableRoot>
    </TableContainer>
  );
};
