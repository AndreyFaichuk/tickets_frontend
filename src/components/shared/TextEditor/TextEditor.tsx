import { FC } from 'react';

import { Divider } from '@mui/material';

import { Editor, EditorContent } from '@tiptap/react';

import { MenuBar } from './components/MenuBar';
import { StyledTextEditorRoot } from './TextEditor.styled';

type TextEditorProps = {
  editor: Editor;
};

export const TextEditor: FC<TextEditorProps> = ({ editor }) => {
  return (
    <StyledTextEditorRoot direction="column" spacing={2}>
      <MenuBar editor={editor} />
      <Divider />
      <EditorContent editor={editor} />
    </StyledTextEditorRoot>
  );
};
