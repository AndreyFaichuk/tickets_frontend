import { ValuesToType } from '@types';

import HighPriorityIcon from '@assests/icon/highPriority.svg';
import LowPriorityIcon from '@assests/icon/lowPriority.svg';
import MiddlePriorityIcon from '@assests/icon/middlePriority.svg';

export const PRIORITY_VARIANT = {
  low: 'low',
  middle: 'middle',
  high: 'high',
} as const;

export type PriorityType = ValuesToType<typeof PRIORITY_VARIANT>;

type CapitalizedPriorityType = Capitalize<PriorityType>;

type OptionsPriorityType = {
  label: CapitalizedPriorityType;
  value: PriorityType;
  icon: string;
};

export const PRIORITY_OPTIONS: Array<OptionsPriorityType> = [
  { label: 'Low', value: PRIORITY_VARIANT.low, icon: LowPriorityIcon },
  { label: 'Middle', value: PRIORITY_VARIANT.middle, icon: MiddlePriorityIcon },
  { label: 'High', value: PRIORITY_VARIANT.high, icon: HighPriorityIcon },
];

export const PRIORITY_ICON_MAP: Record<PriorityType, string> = {
  [PRIORITY_VARIANT.low]: LowPriorityIcon,
  [PRIORITY_VARIANT.middle]: MiddlePriorityIcon,
  [PRIORITY_VARIANT.high]: HighPriorityIcon,
};

export const ALLOWED_FILE_TYPES_MAP = {
  jpg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
