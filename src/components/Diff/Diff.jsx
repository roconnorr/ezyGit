import React, { useMemo } from 'react';
import { Diff, Hunk, withSourceExpansion } from 'react-diff-view';
import 'react-diff-view/style/index.css';
import tokenize from './Tokenize';
import { UnfoldCollapsed } from './UnfoldCollapsed';

const EMPTY_HUNKS = [];

const renderToken = (token, defaultRender, i) => {
  switch (token.type) {
    case 'space':
      // console.log(token);
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

const DiffView = ({ hunks, diffType, onExpandRange }) => {
  const tokens = useMemo(() => tokenize(hunks), [hunks]);

  const renderHunk = (children, hunk) => {
    const previousElement = children[children.length - 1];
    const decorationElement = (
      <UnfoldCollapsed
        key={'decoration-' + hunk.content}
        previousHunk={previousElement && previousElement.props.hunk}
        currentHunk={hunk}
        onClick={onExpandRange}
      />
    );
    children.push(decorationElement);

    const hunkElement = <Hunk key={'hunk-' + hunk.content} hunk={hunk} />;
    children.push(hunkElement);

    return children;
  };

  return (
    <Diff
      viewType="unified"
      diffType={diffType}
      hunks={hunks || EMPTY_HUNKS}
      tokens={tokens}
      renderToken={renderToken}
    >
      {/* {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)} */}
      {hunks => hunks.reduce(renderHunk, [])}
    </Diff>
  );
};

export default withSourceExpansion()(DiffView);
