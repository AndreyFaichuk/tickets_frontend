import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Editor } from '@tiptap/react';

import { useTextEditorMenu } from '../../hooks/useTextEditorMenu';
import {
  StyledTextEditorButton,
  StyledTextEditorMenuRoot,
} from '../../TextEditor.styled';

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const {
    DEFAULT_TEXT_EDITOR_HEADING,
    DEFAULT_TEXT_EDITOR_POSITION,
    DEFAULT_TEXT_EDITOR_COLORS,
    DEFAULT_TEXT_EDITOR_STYLES,
    currentValues: { position, heading, color },
    handlers: { handlePositionChange, handleHeadingChange, handleColorChange },
  } = useTextEditorMenu(editor);

  return (
    <StyledTextEditorMenuRoot>
      <FormControl
        variant="filled"
        sx={{ m: 1, minWidth: 120, minHeight: '40px' }}>
        <InputLabel id="position-label">Position</InputLabel>
        <Select
          labelId="position-label"
          value={position}
          onChange={handlePositionChange}
          label="Position">
          {Object.entries(DEFAULT_TEXT_EDITOR_POSITION).map(
            ([key, { onClick }]) => (
              <MenuItem value={key} key={key} onClick={onClick}>
                {key}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      <Divider orientation="vertical" />

      <FormControl
        variant="filled"
        sx={{ m: 1, minWidth: 120, minHeight: '40px' }}>
        <InputLabel id="position-heading">Heading</InputLabel>
        <Select
          labelId="position-heading"
          value={heading}
          onChange={handleHeadingChange}
          label="Heading">
          {Object.entries(DEFAULT_TEXT_EDITOR_HEADING).map(
            ([key, { onClick }]) => (
              <MenuItem value={key} key={key} onClick={onClick}>
                {key}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      <FormControl
        variant="filled"
        sx={{ m: 1, minWidth: 120, minHeight: '40px' }}>
        <InputLabel id="color-label">Color</InputLabel>
        <Select
          labelId="color-label"
          value={color}
          onChange={handleColorChange}
          label="Color">
          {Object.entries(DEFAULT_TEXT_EDITOR_COLORS).map(
            ([key, { onClick }]) => (
              <MenuItem value={key} key={key} onClick={onClick}>
                {key}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      {Object.entries(DEFAULT_TEXT_EDITOR_STYLES).map(
        ([key, { isActive, onClick }]) => (
          <StyledTextEditorButton
            key={key}
            isActive={isActive}
            onClick={onClick}>
            {key}
          </StyledTextEditorButton>
        ),
      )}
    </StyledTextEditorMenuRoot>
  );
};
