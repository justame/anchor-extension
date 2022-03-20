import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';

const hasLink = (node) => {
  return node.marks.map((mark) => mark.type.name).includes('link');
};

export default function (doc: Node, oldState: DecorationSet): DecorationSet {
  const decorations: Decoration[] = [];
  console.log({ oldState });
  console.log('hash');
  const hashtagRegex = /(\s|^)#\w(\S)+/gm;
  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(hashtagRegex)).forEach((match) => {
      const hash = match[0];
      console.log({ hash, match, node });

      //TODO: find a solution for extension knowing another extension logic
      // if node has link hashtag should not be applied
      console.log(hasLink(node));
      let hashLength = hash.length;
      let index = match.index || 0;
      if (hash.startsWith(' ')) {
        index++;
        hashLength--;
      }

      const from = position + index;
      const to = from + hashLength;

      if (hasLink(node)) {
        return false;
      }

      const decoration = Decoration.inline(
        from,
        to,
        {
          class: 'hash-tag',
        },
        { name: 'hashtag' }
      );

      decorations.push(decoration);
    });
  });
  console.log({ decorations });
  return DecorationSet.create(doc, decorations);
}
