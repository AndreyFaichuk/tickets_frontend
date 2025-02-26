import { securityAxios } from './securityAxios';
import { PromiseAxiosResponse } from '../types';
import {
  ColumnForCreate,
  ColumnForReplace,
  ColumnForUpdate,
} from '../hooks/columns/useColumnsActions';
import { CurrentDnDColumnType } from '../pages/TodosPage/components/DnDToDoProvider/DnDToDoProvider.constants';
import { BASE_URL } from '../constants';
import { RawColumnType } from '../pages/TodosPage/components/DnDToDoProvider/hooks/useColumnsManagement';

const COLUMN_URL = `${BASE_URL}/columns`;

export class ColumnApi {
  static addColumn(
    columnForCreate: ColumnForCreate,
  ): PromiseAxiosResponse<RawColumnType> {
    const response = securityAxios.post(
      `${COLUMN_URL}/create`,
      columnForCreate,
    );

    return response;
  }

  static updateColumn(
    columnForUpdate: ColumnForUpdate,
    columnId: string,
  ): PromiseAxiosResponse<RawColumnType> {
    const response = securityAxios.patch(
      `${COLUMN_URL}/${columnId}`,
      columnForUpdate,
    );

    return response;
  }

  static getColumns(
    workspaceId: string,
  ): PromiseAxiosResponse<RawColumnType[]> {
    const response = securityAxios.get(`${COLUMN_URL}/all/${workspaceId}`);
    return response;
  }

  static deleteColumn(id: string): PromiseAxiosResponse<RawColumnType> {
    const response = securityAxios.delete(`${COLUMN_URL}/${id}`);

    return response;
  }

  static moveTodoColumns(
    moveTodo: CurrentDnDColumnType,
  ): PromiseAxiosResponse<RawColumnType> {
    const response = securityAxios.post(`${COLUMN_URL}/move`, moveTodo);

    return response;
  }

  static replaceAllTodosToColumn(
    body: ColumnForReplace,
  ): PromiseAxiosResponse<RawColumnType> {
    const response = securityAxios.put(`${COLUMN_URL}/replace`, body);

    return response;
  }
}
