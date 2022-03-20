import { Extension } from '@tiptap/react';
import { Plugin } from 'prosemirror-state';
import findHashTag from './findHashTag';

export const HashTag = Extension.create({
  name: 'ricoshashtag',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findHashTag(doc, null);
          },
          apply(transaction, oldState) {
            
            return transaction.docChanged
              ? findHashTag(transaction.doc, oldState)
              : oldState;
          },
        },
        props: {
          decorations(state) {
            console.log('this.getState(state)', this.getState(state));
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

console.log('moshe');
