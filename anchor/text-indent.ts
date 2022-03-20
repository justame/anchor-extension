import { Extension } from '@tiptap/core'

type TextAlignOptions = {
  types: string[],
  }

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textIndentation: {

      setTextIndentation (indentation: number) => ReturnType,

       unsetTextIndentation: () => ReturnType,
    }
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
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: element => ({
              textAlign: element.style.textAlign || this.options.defaultAlignment,
            }),
            renderHTML: attributes => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {}
              }

              return { style: `text-align: ${attributes.textAlign}` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setTextIndentation: (indentation: Indentation) => ({ commands }) => {
         return this.options.types.every(type => commands.updateAttributes(type, { indentation }))
      },
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'indentation'))
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
      'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
      'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
      'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify'),
    }
  },
})