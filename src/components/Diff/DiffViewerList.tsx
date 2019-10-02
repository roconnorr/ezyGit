import React from 'react';
import { getGitDifference } from './GetGitDifference';
import { FileStatusChanges } from '../../git/git';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';
import DiffViewerListItem from './DiffViewerListItem';

const DiffViewerList = (gitDiff: Array<FileStatusChanges>) => {
  const renderGitCommit = (index: number, key: number | string) => {
    const record = gitDiff[index];
    const [diff] = getGitDifference(record.modified, record.original);

    return (
      <DiffViewerListItem
        key={index}
        hunks={diff.hunks}
        diffType={diff.type}
        oldSource={record.original}
        fileName={record.path}
      />
    );
  };

  return (
    <Scrollbars>
      <ReactList
        itemRenderer={renderGitCommit}
        length={gitDiff.length}
        type="variable"
        threshold={5000}
      />
    </Scrollbars>
  );
};

export { DiffViewerList };
