import React from 'react';
import { getGitDifference } from './GetGitDifference';
import { fileChanges } from '../../git/git';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';
import DiffViewerListItem from './DiffViewerListItem';

const DiffViewerList = (gitDiff: Array<fileChanges>) => {
  const renderGitCommit = (index: number, key: number | string) => {
    const record = gitDiff[index];
    const [diff] = getGitDifference(record.newState, record.originalState);

    return (
      <DiffViewerListItem
        key={index}
        hunks={diff.hunks}
        diffType={diff.type}
        oldSource={record.originalState}
        fileName={record.fileName}
      />
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

export { DiffViewerList };
