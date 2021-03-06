import React, { Fragment } from 'react';
import { getCollapsedLinesCountBetween } from 'react-diff-view';
import Unfold from './Unfold';

const UnfoldCollapsed = ({
  previousHunk,
  currentHunk,
  linesCount,
  onExpand,
}) => {
  if (!currentHunk) {
    const nextStart = previousHunk.oldStart + previousHunk.oldLines;
    const collapsedLines = linesCount - nextStart + 1;

    if (collapsedLines <= 0) {
      return null;
    }

    return (
      <Fragment>
        {collapsedLines > 10 ? (
          <Unfold
            direction="down"
            start={nextStart}
            end={nextStart + 10}
            onExpand={onExpand}
          />
        ) : (
          <Unfold
            direction="none"
            start={nextStart}
            end={linesCount + 1}
            onExpand={onExpand}
          />
        )}
      </Fragment>
    );
  }

  const collapsedLines = getCollapsedLinesCountBetween(
    previousHunk,
    currentHunk
  );

  if (!previousHunk) {
    if (!collapsedLines) {
      return null;
    }

    const start = Math.max(currentHunk.oldStart - 10, 1);

    return (
      <Fragment>
        <Unfold
          direction="none"
          start={1}
          end={currentHunk.oldStart}
          onExpand={onExpand}
        />
        {collapsedLines > 10 ? (
          <Unfold
            direction="up"
            start={start}
            end={currentHunk.oldStart}
            onExpand={onExpand}
          />
        ) : null}
      </Fragment>
    );
  }

  const collapsedStart = previousHunk.oldStart + previousHunk.oldLines;
  const collapsedEnd = currentHunk.oldStart;

  if (collapsedLines < 10) {
    return (
      <Unfold
        direction="none"
        start={collapsedStart}
        end={collapsedEnd}
        onExpand={onExpand}
      />
    );
  }

  return (
    <Fragment>
      <Unfold
        direction="down"
        start={collapsedStart}
        end={collapsedStart + 10}
        onExpand={onExpand}
      />
      <Unfold
        direction="none"
        start={collapsedStart}
        end={collapsedEnd}
        onExpand={onExpand}
      />
      <Unfold
        direction="up"
        start={collapsedEnd - 10}
        end={collapsedEnd}
        onExpand={onExpand}
      />
    </Fragment>
  );
};

export { UnfoldCollapsed };
