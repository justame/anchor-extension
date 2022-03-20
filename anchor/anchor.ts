import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
  findChildren,
} from '@tiptap/core';

import { Plugin } from 'prosemirror-state';

export interface AnchorOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      /**
       * Set a bold mark
       */
      setAnchor: (anchor: string) => ReturnType;
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
    if (HTMLAttributes.anchor) {
      span.setAttribute('ricos-anchor', HTMLAttributes.anchor);
    }

    return span;
  },

  addCommands() {
    return {
      setAnchor:
        (anchor) =>
        ({ commands }) => {
          return commands.setMark(this.name, {
            anchor,
          });
        },

      unsetAnchor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // prevent dragging nodes out of the figure
            click: (view, event) => {
              if (!event.target) {
                return false;
              }

              const anchor = event.target?.getAttribute('ricos-anchor');
              if (!anchor) {
                return false;
              }

              const foundNodes = findChildren(view.state.doc, (node) => {
                return node?.attrs?.id === anchor;
              });

              let targetDom = null;
              if (foundNodes.length > 0) {
                targetDom = view.nodeDOM(foundNodes[0].pos);
                if (!targetDom.scrollIntoView) {
                  // might be text node
                  targetDom = targetDom.parentElement;
                }
              }

              targetDom.scrollIntoView({ behavior: 'smooth' });

              return true;
            },
          },
        },
      }),
    ];
  },
});
