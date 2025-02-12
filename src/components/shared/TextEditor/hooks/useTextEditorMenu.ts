import { Editor } from '@tiptap/react';
import {
  DEFAULT_POSITION_HEADING,
  DEFAULT_POSITION_HEADING_MAP,
  DEFAULT_POSITION_VALUES,
  DEFAULT_POSITION_VALUES_MAP,
  Heading,
  HeadingMap,
  Position,
} from '../TextEditor.constants';
import { SelectChangeEvent } from '@mui/material';

export type TextEditorStyles =
  | 'Paragraph'
  | 'Bold'
  | 'Italic'
  | 'Strike'
  | 'Highlight';

export type TextEditorPosition = Capitalize<Position>;

export type TextEditorColors = 'Red' | 'Blue' | 'Green';

type MenuBar<T extends string> = {
  [key in T]: {
    isActive: boolean;
    onClick: VoidFunction;
    isDivider?: boolean;
  };
};

export const useTextEditorMenu = (editor: Editor) => {
  const handleSetTextAlign = (position: Position) => {
    editor.chain().focus().setTextAlign(position).run();
  };

  const isActiveColor = (position: Position) => {
    return editor.isActive({ textAlign: position });
  };

  const handleSetTextHeading = (heading: Heading) => {
    editor.chain().focus().toggleHeading({ level: heading }).run();
  };

  const isActiveHeading = (heading: Heading) => {
    return editor.isActive('heading', { level: heading });
  };

  const DEFAULT_TEXT_EDITOR_HEADING: MenuBar<HeadingMap> = {
    [DEFAULT_POSITION_HEADING_MAP.h1]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h1),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h1),
    },
    [DEFAULT_POSITION_HEADING_MAP.h2]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h2),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h2),
    },
    [DEFAULT_POSITION_HEADING_MAP.h3]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h3),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h3),
    },
    [DEFAULT_POSITION_HEADING_MAP.h4]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h4),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h4),
    },
    [DEFAULT_POSITION_HEADING_MAP.h5]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h5),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h5),
    },
    [DEFAULT_POSITION_HEADING_MAP.h6]: {
      onClick: () => handleSetTextHeading(DEFAULT_POSITION_HEADING.h6),
      isActive: isActiveHeading(DEFAULT_POSITION_HEADING.h6),
    },
  };

  const DEFAULT_TEXT_EDITOR_STYLES: MenuBar<TextEditorStyles> = {
    Paragraph: {
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
    },
    Bold: {
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    Italic: {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    Strike: {
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    Highlight: {
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive('highlight'),
      isDivider: true,
    },
  } as const;

  const DEFAULT_TEXT_EDITOR_POSITION: MenuBar<TextEditorPosition> = {
    [DEFAULT_POSITION_VALUES_MAP.left]: {
      onClick: () => handleSetTextAlign(DEFAULT_POSITION_VALUES.left),
      isActive: isActiveColor(DEFAULT_POSITION_VALUES.left),
    },
    [DEFAULT_POSITION_VALUES_MAP.center]: {
      onClick: () => handleSetTextAlign(DEFAULT_POSITION_VALUES.center),
      isActive: isActiveColor(DEFAULT_POSITION_VALUES.center),
    },
    [DEFAULT_POSITION_VALUES_MAP.right]: {
      onClick: () => handleSetTextAlign(DEFAULT_POSITION_VALUES.right),
      isActive: isActiveColor(DEFAULT_POSITION_VALUES.right),
    },
    [DEFAULT_POSITION_VALUES_MAP.justify]: {
      onClick: () => handleSetTextAlign(DEFAULT_POSITION_VALUES.justify),
      isActive: isActiveColor(DEFAULT_POSITION_VALUES.justify),
    },
  } as const;

  const DEFAULT_TEXT_EDITOR_COLORS: MenuBar<TextEditorColors> = {
    Red: {
      onClick: () => editor.chain().focus().setColor('#958DF1').run(),
      isActive: editor.isActive('textStyle', { color: '#958DF1' }),
    },
    Blue: {
      onClick: () => editor.chain().focus().setColor('#958DF1').run(),
      isActive: editor.isActive('textStyle', { color: '#958DF1' }),
    },
    Green: {
      onClick: () => editor.chain().focus().setColor('#958DF1').run(),
      isActive: editor.isActive('textStyle', { color: '#958DF1' }),
    },
  } as const;

  const currentPosition =
    Object.entries(DEFAULT_TEXT_EDITOR_POSITION).find(
      ([_, { isActive }]) => isActive,
    )?.[0] ?? DEFAULT_POSITION_VALUES_MAP.left;

  const handlePositionChange = (event: SelectChangeEvent) => {
    const selectedPosition = event.target.value as TextEditorPosition;
    DEFAULT_TEXT_EDITOR_POSITION[selectedPosition].onClick();
  };

  const currentHeading =
    Object.entries(DEFAULT_TEXT_EDITOR_HEADING).find(
      ([_, { isActive }]) => isActive,
    )?.[0] ?? '';

  const handleHeadingChange = (event: SelectChangeEvent) => {
    const selectedHeading = parseInt(event.target.value as string);

    const heading = Object.keys(DEFAULT_POSITION_HEADING_MAP).find(
      (key) =>
        DEFAULT_POSITION_HEADING_MAP[
          key as keyof typeof DEFAULT_POSITION_HEADING_MAP
        ] === selectedHeading.toString(),
    ) as keyof typeof DEFAULT_POSITION_HEADING_MAP;

    if (DEFAULT_TEXT_EDITOR_HEADING[heading]) {
      DEFAULT_TEXT_EDITOR_HEADING[heading].onClick();
    }
  };

  return {
    DEFAULT_TEXT_EDITOR_HEADING,
    DEFAULT_TEXT_EDITOR_STYLES,
    DEFAULT_TEXT_EDITOR_POSITION,
    DEFAULT_TEXT_EDITOR_COLORS,
    currentValues: {
      position: currentPosition,
      heading: currentHeading,
    },
    handlers: {
      handlePositionChange,
      handleHeadingChange,
    },
  };
};
