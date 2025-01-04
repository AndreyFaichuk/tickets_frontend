import { AxiosError } from 'axios';

export type ValuesToType<T> = T[keyof T];

export type ApiResponse<T> = Promise<T>;

type AxiosErrorResponseData = {
  message: string;
};

export type AxiosErrorResponse = AxiosError & {
  response?: {
    data: AxiosErrorResponseData;
  };
};
