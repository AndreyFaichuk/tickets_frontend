import { AxiosError, AxiosResponse } from 'axios';
import { User } from '@app/DefaultUserMenu/DefaultUserMenu.types';
import { DEFAULT_FORM_ELEMENTS } from './constants';

export type ValuesToType<T> = T[keyof T];

export type ApiResponse<T> = Promise<T>;

export type PromiseAxiosResponse<T> = Promise<AxiosResponse<T>>;

export type CreatorUser = Pick<User, 'avatarUrl' | 'firstName' | 'lastName'> & {
  userId: string;
};

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

export type PaginatedData<T> = {
  content: T;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
};

type FormElements = ValuesToType<typeof DEFAULT_FORM_ELEMENTS>;

export type FormCompositeNames<T extends string> = {
  [key in T]: CompositeName<key, FormElements>;
};

export type CompositeName<
  U extends string,
  K extends FormElements,
> = `form-${K}_${U}`;
