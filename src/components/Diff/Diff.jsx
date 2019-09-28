import React, { Component, useMemo } from 'react';
import { parseDiff, Diff, Hunk, Decoration } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import 'react-diff-view/style/index.css';
import tokenize from './Tokenize';

const EMPTY_HUNKS = [];

const renderToken = (token, defaultRender, i) => {
  switch (token.type) {
    case 'space':
      console.log(token);
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

const NewDiff = ({ originText, changedText }) => {
  const diffText = formatLines(diffLines(originText, changedText), {
    context: 3,
  });
  const [diff] = parseDiff(diffText, { nearbySequences: 'zip' });
  console.log(diff);

  const { type, hunks } = diff;

  const tokens = useMemo(() => tokenize(hunks), [hunks]);

  return (
    <Diff
      viewType="unified"
      diffType={type}
      hunks={hunks || EMPTY_HUNKS}
      tokens={tokens}
      renderToken={renderToken}
    >
      {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );
};

export { NewDiff };
