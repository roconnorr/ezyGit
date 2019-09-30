import React from 'react';
import { getGitDifference } from './GetGitDifference';
import { fileChanges } from '../../git/git';
import Diff from './Diff';

const DiffViewer = (gitDiff: Array<fileChanges>) => {
  const diffs = gitDiff.map((change, index) => {
    const [diff] = getGitDifference(change.newState, change.originalState);
    console.log(diff);

    return (
      <div key={index}>
        <Diff
          hunks={diff.hunks}
          diffType={diff.type}
          oldSource={change.originalState}
        />
      </div>
    );
  });

  return diffs;
};

export { DiffViewer };
