import React, { useMemo } from 'react';
import { Diff, Hunk, withSourceExpansion } from 'react-diff-view';
// import 'react-diff-view/style/index.css';
import tokenize from './Tokenize';
import { UnfoldCollapsed } from './UnfoldCollapsed';

const EMPTY_HUNKS = [];

const renderToken = (token, defaultRender, i) => {
  switch (token.type) {
    case 'space':
      return (
        <span key={i} className="space">
          {token.children &&
            token.children.map((token, i) =>
              renderToken(token, defaultRender, i)
            )}
        </span>
      );
    default:
      return defaultRender(token, i);
  }
};

const DiffView = ({
  hunks,
  diffType,
  onExpandRange,
  oldSource,
  onToggleChangeSelection,
}) => {
  const tokens = useMemo(() => tokenize(hunks), [hunks]);

  const linesCount = oldSource ? oldSource.split('\n').length : 0;
  const renderHunk = (children, hunk, i, hunks) => {
    const previousElement = children[children.length - 1];
    const decorationElement = oldSource ? (
      <UnfoldCollapsed
        key={'decoration-' + hunk.content}
        previousHunk={previousElement && previousElement.props.hunk}
        currentHunk={hunk}
        linesCount={linesCount}
        onExpand={onExpandRange}
      />
    ) : null;
    children.push(decorationElement);
    const events = {
      onClick: onToggleChangeSelection,
    };

    const hunkElement = (
      <Hunk
        key={'hunk-' + hunk.content}
        hunk={hunk}
        codeEvents={events}
        gutterEvents={events}
      />
    );
    children.push(hunkElement);

    if (i === hunks.length - 1 && oldSource) {
      const unfoldTailElement = (
        <UnfoldCollapsed
          key="decoration-tail"
          previousHunk={hunk}
          linesCount={linesCount}
          onExpand={onExpandRange}
        />
      );
      children.push(unfoldTailElement);
    }

    return children;
  };

  return (
    <Diff
      viewType={'unified' ? 'split' : 'split'}
      diffType={diffType}
      hunks={hunks || EMPTY_HUNKS}
      tokens={tokens}
      renderToken={renderToken}
    >
      {hunks => hunks.reduce(renderHunk, [])}
    </Diff>
  );
};

export default withSourceExpansion()(DiffView);
