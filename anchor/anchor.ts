import { Mark, findChildren } from '@tiptap/core';

export interface AnchorOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      setAnchor: (anchor: string) => ReturnType;

      unsetAnchor: () => ReturnType;

      scrollToAnchor: (anchor: string) => ReturnType;
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
      scrollToAnchor:
        (anchor) =>
        ({ editor }) => {
          const { view } = editor;
          const foundNodes = findChildren(view.state.doc, (node) => {
            return node?.attrs?.id?.toString() === anchor;
          });

          if (foundNodes.length === 0) {
            return false;
          }

          let targetDom = null;

          targetDom = view.nodeDOM(foundNodes[0].pos);
          if (!targetDom.scrollIntoView) {
            // might be text node
            targetDom = targetDom.parentElement;
          }

          targetDom.scrollIntoView({ behavior: 'smooth' });
        },
    };
  },
});
