import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type useTextEditorConfigProps = {
  comment?: string;
};

export const useTextEditorConfig = ({ comment }: useTextEditorConfigProps) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure(),
      ],
      content: comment ?? ' ',
      editorProps: {
        attributes: {
          class: `text-editor__editor`,
        },
      },
    },
    [comment],
  );

  return editor;
};
