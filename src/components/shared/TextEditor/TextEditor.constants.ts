import { green, red, blue, purple } from '@mui/material/colors';
import { ValuesToType } from '@types';
import { hexToRgb } from '@mui/material';

export const DEFAULT_POSITION_VALUES_MAP = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
  Justify: 'justify',
} as const;

export type Position = ValuesToType<typeof DEFAULT_POSITION_VALUES_MAP>;
export type TextEditorPosition = keyof typeof DEFAULT_POSITION_VALUES_MAP;

export const DEFAULT_POSITION_HEADING = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6,
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
export type TextEditorHeading = keyof typeof DEFAULT_POSITION_HEADING_MAP;

export const DEFAULT_COLOR_VALUES_MAP = {
  Red: hexToRgb(red[900]),
  Blue: hexToRgb(blue[900]),
  Green: hexToRgb(green[900]),
  Purple: hexToRgb(purple[900]),
} as const;

export type Color = ValuesToType<typeof DEFAULT_COLOR_VALUES_MAP>;
export type TextEditorColor = keyof typeof DEFAULT_COLOR_VALUES_MAP;
