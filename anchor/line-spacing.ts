import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

export const LineSpacing = Extension.create({
  name: 'line-spacing',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          textStyle: {
            renderHTML: (attributes) => {
              return {
                style: `color:red`,
              };
            },
          },
        },
      },
    ];
  },

});

console.log('moshe');
