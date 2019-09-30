import React from 'react';
import { Button } from '@blueprintjs/core';

const UnfoldCollapsed = ({ previousHunk, currentHunk, onClick }) => {
  const start = previousHunk
    ? previousHunk.oldStart + previousHunk.oldLines
    : 1;
  const end = currentHunk.oldStart - 1;

  return <Button onClick={() => onClick(start, end)}>Click to expand</Button>;
};

export { UnfoldCollapsed };
