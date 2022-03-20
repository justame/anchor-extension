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

export const TextAlign = Extension.create<TextAlignOptions>({
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
              return { style: `margin-left: ${attributes.indentation * 10}` };
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
          return this.options.types.every((type) =>
            commands.updateAttributes(type, { indentation })
          );
        },
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
