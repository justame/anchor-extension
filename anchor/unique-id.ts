import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

export const UniqueID = Extension.create({
  name: 'unique-indexed',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
  addProseMirrorPlugins() {
    console.log('UniqueID');
    return [
      new Plugin({
        key: new PluginKey('unique-id'),
        appendTransaction: (_transactions, oldState, newState) => {
          if (newState.doc === oldState.doc) {
            return;
          }
          const tr = newState.tr;
          const usedIds = {};
          console.log({ usedIds });

          newState.doc.descendants((node, pos) => {
            const nodeId = node.attrs.id;
            const id =
              nodeId && !usedIds[nodeId]
                ? nodeId
                : Math.round(Math.random() * 100000);
            usedIds[id] = true;
            if (node.isBlock) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                id,
              });
            }
          });

          return tr;
        },
      }),
    ];
  },
});

console.log('moshe');
