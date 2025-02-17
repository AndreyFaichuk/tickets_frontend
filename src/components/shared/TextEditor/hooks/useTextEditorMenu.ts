import { Editor } from '@tiptap/react';
import {
  Color,
  DEFAULT_COLOR_VALUES_MAP,
  DEFAULT_POSITION_HEADING,
  DEFAULT_POSITION_HEADING_MAP,
  DEFAULT_POSITION_VALUES_MAP,
  Heading,
  Position,
  TextEditorColor,
  TextEditorHeading,
  TextEditorPosition,
} from '../TextEditor.constants';
import { SelectChangeEvent } from '@mui/material';
import { getDefaultEditorOptions, MenuBar } from '../TextEditor.utils';

export type TextEditorStyles =
  | 'Paragraph'
  | 'Bold'
  | 'Italic'
  | 'Strike'
  | 'Highlight';

export const useTextEditorMenu = (editor: Editor) => {
  const handleSetTextAlign = (position: Position) => {
    editor.chain().focus().setTextAlign(position).run();
  };

  const isActivePosition = (position: Position) => {
    return editor.isActive({ textAlign: position });
  };

  const handleSetTextHeading = (heading: Heading) => {
    editor.chain().focus().toggleHeading({ level: heading }).run();
  };

  const isActiveHeading = (heading: Heading) => {
    return editor.isActive('heading', { level: heading });
  };

  const handleSetTextColor = (color: Color) => {
    editor.chain().focus().setColor(color).run();
  };

  const isActiveColor = (color: Color) => {
    return editor.isActive('textStyle', { color });
  };

  const DEFAULT_TEXT_EDITOR_HEADING = getDefaultEditorOptions<
    TextEditorHeading,
    Heading
  >(DEFAULT_POSITION_HEADING, {
    onClick: (value: Heading) => handleSetTextHeading(value),
    isActive: (value: Heading) => isActiveHeading(value),
  });

  const DEFAULT_TEXT_EDITOR_POSITION = getDefaultEditorOptions<
    TextEditorPosition,
    Position
  >(DEFAULT_POSITION_VALUES_MAP, {
    onClick: (value: Position) => handleSetTextAlign(value),
    isActive: (value: Position) => isActivePosition(value),
  });

  const DEFAULT_TEXT_EDITOR_COLORS = getDefaultEditorOptions<
    TextEditorColor,
    Color
  >(DEFAULT_COLOR_VALUES_MAP, {
    onClick: (value: Color) => handleSetTextColor(value),
    isActive: (value: Color) => isActiveColor(value),
  });

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

  const currentPosition =
    Object.entries(DEFAULT_TEXT_EDITOR_POSITION).find(
      ([_, { isActive }]) => isActive,
    )?.[0] ?? 'Left';

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

  const currentColor =
    Object.entries(DEFAULT_TEXT_EDITOR_COLORS).find(
      ([_, { isActive }]) => isActive,
    )?.[0] ?? '';

  const handleColorChange = (event: SelectChangeEvent) => {
    const selectedColor = event.target.value as TextEditorColor;
    DEFAULT_TEXT_EDITOR_COLORS[selectedColor].onClick();
  };

  return {
    DEFAULT_TEXT_EDITOR_HEADING,
    DEFAULT_TEXT_EDITOR_STYLES,
    DEFAULT_TEXT_EDITOR_POSITION,
    DEFAULT_TEXT_EDITOR_COLORS,
    currentValues: {
      position: currentPosition,
      heading: currentHeading,
      color: currentColor,
    },
    handlers: {
      handlePositionChange,
      handleHeadingChange,
      handleColorChange,
    },
  };
};
