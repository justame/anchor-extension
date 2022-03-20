import { Extension } from '@tiptap/core';

type TextAlignOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textIndentation: {
      setTextIndentation: (indentation: number) => ReturnType;

      unsetTextIndentation: () => ReturnType;
    };
  }
}

type Indentation = 1 | 2 | 3 | 4;

const INDENT_SIZE = 24;
export const TextIndentation = Extension.create<TextAlignOptions>({
  name: 'textAlign',

  defaultOptions: {
    types: ['heading', 'paragraph'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indentation: {
            default: 0,
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
    return {
      setTextIndentation:
        (indentation: Indentation) =>
        ({ commands }) => {
          if (indentation < 0 || indentation > 4) {
            return false;
          }
          return this.options.types.every((type) =>
            commands.updateAttributes(type, { indentation })
          );
        },
      increaseIndextation: () => () => {},
      unsetTextAlign:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, 'indentation')
          );
        },
    };
  },
});
