import { Extension } from '@tiptap/react';

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
  defaultOptions: {
    types: ['heading', 'paragraph'],
  },
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          textStyle: {
            renderHTML: (attributes) => {
              let styles = [];
              if (attributes?.textStyle?.lineHeight) {
                styles.push(`line-height:${attributes.textStyle.lineHeight}`);
              }
              return {
                style: styles.join(';'),
              };
            },
          },
        },
      },
      {
        types: ['paragraph', 'heading'],
        attributes: {
          style: {
            renderHTML: (attributes) => {
              let styles = [];

              if (attributes?.style?.paddingTop) {
                styles.push(`padding-top:${attributes.style.paddingTop}`);
              }
              if (attributes?.style?.paddingBottom) {
                styles.push(`padding-bottom:${attributes.style.paddingBottom}`);
              }
              return {
                style: styles.join(';'),
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineSpacing:
        (lineSpacing: number) =>
        ({ commands }) => {
          if (lineSpacing > 100 || lineSpacing < 0) {
            return false;
          }
          return this.options.types.every((type) =>
            commands.updateAttributes(type, {
              textStyle: { textStyle: { lineHeight: lineSpacing } },
            })
          );
        },
      setLineSpacingBefore:
        (lineSpacing: number) =>
        ({ commands }) => {
          if (lineSpacing > 100 || lineSpacing < 0) {
            return false;
          }
          return this.options.types.every((type) =>
            commands.updateAttributes(type, {
              style: {
                paddingTop: `${lineSpacing}px`,
              },
            })
          );
        },
      setLineSpacingAfter:
        (lineSpacing: number) =>
        ({ commands }) => {
          if (lineSpacing > 100 || lineSpacing < 0) {
            return false;
          }
          return this.options.types.every((type) =>
            commands.updateAttributes(type, {
              style: {
                paddingBottom: `${lineSpacing}px`,
              },
            })
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
