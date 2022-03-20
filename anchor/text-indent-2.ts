import { Command, Extension } from '@tiptap/core';
import { AllSelection, TextSelection, Transaction } from 'prosemirror-state';

export interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indentation: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}
const INDENT_SIZE = 24;
export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  defaultOptions: {
    types: ['listItem', 'paragraph', 'heading'],
    minLevel: 0,
    maxLevel: 4,
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indentation: {
            renderHTML: (attributes) => {
              if (attributes.indentation === 0) {
                return {};
              }

              return {
                style: `margin-left: ${attributes.indentation * INDENT_SIZE}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    const setNodeIndentMarkup = (
      tr: Transaction,
      pos: number,
      delta: number
    ): Transaction => {
      const node = tr?.doc?.nodeAt(pos);

      if (node) {
        const nextLevel = (node.attrs.indentation || 0) + delta;
        const { minLevel, maxLevel } = this.options;
        const indent =
          nextLevel < minLevel
            ? minLevel
            : nextLevel > maxLevel
            ? maxLevel
            : nextLevel;

        if (indent !== node.attrs.indentation) {
          const { indentation: oldIndent, ...currentAttrs } = node.attrs;
          const nodeAttrs =
            indent > minLevel
              ? { ...currentAttrs, indentation: indent }
              : currentAttrs;
          return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
        }
      }
      return tr;
    };

    const updateIndentationLevel = (
      tr: Transaction,
      delta: number
    ): Transaction => {
      const { doc, selection } = tr;

      if (
        doc &&
        selection &&
        (selection instanceof TextSelection ||
          selection instanceof AllSelection)
      ) {
        const { from, to } = selection;
        doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = setNodeIndentMarkup(tr, pos, delta);
            return false;
          }

          return true;
        });
      }

      return tr;
    };
    const applyIndentation: (direction: number) => () => Command =
      (direction) =>
      () =>
      ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);
        tr = updateIndentationLevel(tr, direction);

        if (tr.docChanged) {
          dispatch?.(tr);
          return true;
        }

        return false;
      };

    return {
      indent: applyIndentation(1),
      outdent: applyIndentation(-1),
    };
  },
});
