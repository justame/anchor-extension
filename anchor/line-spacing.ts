import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineSpacing: {
      setLineSpacing: (lineSpacing: number) => ReturnType;
      // maybe it should have a style extension?
      setLineSpacingBefore: (lineSpacing: number) => ReturnType;
      setLineSpacingAfter: (lineSpacing: number) => ReturnType;
    };
  }
}

export const LineSpacing = Extension.create({
  name: 'line-spacing',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          textStyle: {
            renderHTML: (attributes) => {
              console.log({ attributes });
              if (attributes?.textStyle?.lineHeight) {
                return {
                  style: `line-height:${attributes.textStyle.lineHeight}`,
                };
              } else {
                return {};
              }
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

// export const TextAlign = Extension.create({
//   name: 'text-align',
//   addGlobalAttributes() {
//     return [
//       {
//         types: ['paragraph', 'heading'],
//         attributes: {
//           textStyle: {
//             renderHTML: (attributes) => {
//               return {
//                 style: `background-color:blue`,
//               };
//             },
//           },
//         },
//       },
//     ];
//   },
// });
