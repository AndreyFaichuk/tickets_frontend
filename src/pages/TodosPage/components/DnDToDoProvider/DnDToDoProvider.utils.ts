import { ColumnType, RawColumnType } from './hooks/useColumnsManagement';

export const getNormalizeColumns = (
  rawColumns: RawColumnType[],
): ColumnType[] => {
  return rawColumns.map((rawColumn) => {
    return {
      id: rawColumn._id,
      ...rawColumn,
    };
  });
};
