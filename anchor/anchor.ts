import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core';

export interface AnchorOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      /**
       * Set a bold mark
       */
      setAnchor: () => ReturnType;
      /**
       * Toggle a bold mark
       */

      unsetAnchor: () => ReturnType;
    };
  }
}

export const Anchor = Mark.create<AnchorOptions>({
  name: 'anchor',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      anchor: {
        default: '',
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    // it can be implement using <a href="sectionName">/> but it requires to add to all nodes id/name attributes
    const span = document.createElement('span');
    span.setAttribute('yaron', '123');
    console.log({ HTMLAttributes });
    return span;
  },

  addCommands() {
    return {
      setAnchor:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleBold:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetBold:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
