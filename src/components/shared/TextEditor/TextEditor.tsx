import { FC } from 'react';
import { Divider } from '@mui/material';

import { Editor, EditorContent } from '@tiptap/react';

import { StyledTextEditorRoot } from './TextEditor.styled';
import { MenuBar } from './components/MenuBar';

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
