import { securityAxios } from './securityAxios';
import { PromiseAxiosResponse } from '../types';
import { ColumnType } from '../pages/TodosPage/components/DnDToDoProvider/hooks/useDnDManagement';
import { ColumnForUpdate } from '../hooks/columns/useColumnsActions';

const BASE_URL = 'http://localhost:3000/columns';

export class ColumnApi {
  static addColumn(columnName: string): PromiseAxiosResponse<ColumnType> {
    const response = securityAxios.post(`${BASE_URL}/create`, {
      title: columnName,
    });

    return response;
  }

  static updateColumn(
    columnForUpdate: ColumnForUpdate,
  ): PromiseAxiosResponse<ColumnType> {
    const response = securityAxios.patch(
      `${BASE_URL}/${columnForUpdate.card.columnId}`,
      columnForUpdate,
    );

    return response;
  }

  static getColumns(): PromiseAxiosResponse<ColumnType[]> {
    const response = securityAxios.get(`${BASE_URL}/all`);
    return response;
  }

  static deleteColumn(id: string): PromiseAxiosResponse<ColumnType> {
    const response = securityAxios.delete(`${BASE_URL}/${id}`);

    return response;
  }
}
