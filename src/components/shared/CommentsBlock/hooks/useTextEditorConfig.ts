import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

export const useTextEditorConfig = () => {
  return useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
    ],
    content: ' ',
    editorProps: {
      attributes: {
        class: `text-editor__editor`,
      },
    },
  });
};
