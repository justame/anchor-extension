import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { HashTag } from './hash/hashtag';
import { Link } from '@tiptap/extension-link';
import { UniqueID } from './anchor/unique-id';
import { Anchor } from './anchor/anchor';
import { TextIndentation } from './anchor/text-indent';
import { LineHeight } from './anchor/line-spacing';
import { Indent } from './anchor/text-indent-2';

const getSelectedNodes = (editor) => {
  const selection = editor.state.selection;
  const nodes: Node[] = [];
  editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
    nodes.push(node);
  });

  return nodes;
};

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export const Tiptap = ({ onSelectionChange, onLoad }) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>(null as unknown as Editor);

  useEffect(() => {
    const editorInstance = new Editor({
      extensions: [
        StarterKit,
        Image,
        TextStyle,
        Color,
        HashTag,
        Link,
        UniqueID,
        Anchor,
        TextIndentation,
        Indent,
        LineHeight,
      ],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: {
              textStyle: {
                textAlignment: 'CENTER',
                lineHeight: '5.5',
              },
            },
            content: [
              {
                type: 'text',
                text: 'Hello World!',
                marks: [
                  {
                    type: 'anchor',
                    attrs: {
                      anchor: 'moshe',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'textStyle',
                    attrs: {
                      color: 'rgb(149, 141, 241)',
                    },
                  },
                ],
                text: 'text with color',
              },
            ],
          },
          {
            type: 'image',
            attrs: {
              src: 'https://source.unsplash.com/K9QHL52rE2k/800x400',
              alt: null,
              title: null,
            },
          },
          {
            type: 'paragraph',
            attrs: {
              id: 'moshe',
            },
            content: [
              {
                type: 'text',
                text: 'link to me',
              },
            ],
          },
        ],
      },
      injectCSS: true,
      onUpdate: ({ editor }) => {
        if (editor) {
          const nodes = getSelectedNodes(editor);
          onSelectionChange(nodes);
        }
      },
      onSelectionUpdate: ({ editor }) => {
        if (editor) {
          const nodes = getSelectedNodes(editor);
          onSelectionChange(nodes);
        }
      },
    });

    editorInstance.on('transaction', forceUpdate);
    window.editorInstance = editorInstance;
    setEditor(editorInstance);
    onLoad(editorInstance);
  }, []);

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};
