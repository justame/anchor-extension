import { ContentResolver } from './ContentResolver';

export const alwaysVisible = ContentResolver.create({
  resolve: (content) => {
    return true;
  },
  description: 'always visible',
});

export const isContainsOnlyText = ContentResolver.create({
  resolve: (content) => {
    return (
      Array.isArray(content) &&
      content.every(
        (node) => node.type.name === 'text' || node.type.name === 'paragraph'
      )
    );
  },
  description: 'is contains text',
});

export const isContainsBold = ContentResolver.create({
  resolve: (content) => {
    if (Array.isArray(content)) {
      const node = content.find((node) => {
        return node.type.name === 'text' && node.marks.length > 0;
      });
      const currentMark = node?.marks[0]?.type.name;
      return !!currentMark;
    }
    return false;
  },
  description: 'text color',
});

export const textColorResolver = ContentResolver.create({
  resolve: (content) => {
    if (Array.isArray(content)) {
      const node = content.find((node) => {
        if (node.marks.length > 0) {
          const currentMark = node.marks.find((mark) => !!mark.attrs?.color);
          return currentMark;
        }
        return node.type.name === 'text' && node.marks.length > 0;
      });
      const currentMark = node?.marks.find((mark) => !!mark.attrs?.color);
      if (currentMark) {
        return currentMark.attrs.color;
      }
    }
    return 'transparent';
  },
  description: 'text color',
});

export const onlyImageSelected = ContentResolver.create({
  resolve: (content) => {
    return (
      Array.isArray(content) &&
      content.length === 1 &&
      content[0].type.name === 'image'
    );
  },
  description: 'text color',
});
