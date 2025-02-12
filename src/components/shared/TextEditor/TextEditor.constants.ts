import { ValuesToType } from '../../../types';

export const DEFAULT_POSITION_VALUES = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
} as const;

export const DEFAULT_POSITION_VALUES_MAP = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  justify: 'Justify',
} as const;

export type Position = ValuesToType<typeof DEFAULT_POSITION_VALUES>;

export const DEFAULT_POSITION_HEADING = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
} as const;

export const DEFAULT_POSITION_HEADING_MAP = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

export type Heading = ValuesToType<typeof DEFAULT_POSITION_HEADING>;
export type HeadingMap = ValuesToType<typeof DEFAULT_POSITION_HEADING_MAP>;
