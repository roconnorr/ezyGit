import React from 'react';
import { getGitDifference } from './GetGitDifference';
import { fileChanges } from '../../git/git';
import Diff from './Diff';
import { Collapse } from '@blueprintjs/core';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';

const DiffViewer = (gitDiff: Array<fileChanges>) => {
  const renderGitCommit = (index: number, key: number | string) => {
    console.log('temp');
    const record = gitDiff[index];
    const [diff] = getGitDifference(record.newState, record.originalState);

    return (
      <div key={index}>
        <Diff
          hunks={diff.hunks}
          diffType={diff.type}
          oldSource={record.originalState}
        />
      </div>
    );
  };

  return (
    <Scrollbars>
      <ReactList
        itemRenderer={renderGitCommit}
        length={gitDiff.length}
        type="variable"
      />
    </Scrollbars>
  );
};

export { DiffViewer };
