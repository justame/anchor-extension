import React from 'react';

const TiptapPosition = ({ editor, children }) => {
  const { state, view } = editor;
  let { from, to } = state.selection;
  // These are in screen coordinates
  let start = view.coordsAtPos(from),
    end = view.coordsAtPos(to);
  // The box in which the tooltip is positioned, to use as base
  // Find a center-ish x position from the selection endpoints (when
  // crossing lines, end may be more to the left)
  let left = Math.max((start.left + end.left) / 2, start.left + 3);
  const finalLeft = left;
  const finalTop = start.top;

  const isCollapsed = to - from <= 0;
  return children({ left: finalLeft, top: finalTop, isCollapsed });
};

export default TiptapPosition;
