export type ValuesToType<T> = T[keyof T];
export type ApiResponse<T> = Promise<T>;
