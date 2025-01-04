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

export type AuthType = 'registration' | 'login';

export type AuthContent = {
  title: string;
  subtitle: React.ReactNode;
};
