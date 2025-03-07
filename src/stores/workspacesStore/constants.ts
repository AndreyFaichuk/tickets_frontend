import { ValuesToType } from '../../types';

export const DEFAULT_CURRENT_PAGE = '1' as const;

export const DEFAULT_PER_PAGE = {
  ten: '10',
  twenty: '20',
  thirty: '30',
} as const;

export type PerPage = ValuesToType<typeof DEFAULT_PER_PAGE>;
