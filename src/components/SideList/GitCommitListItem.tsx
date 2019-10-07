import React from 'react';
import { GitCommitLog } from '../../git/newGit';
import GitCommitDetails from './GitCommitDetails';
import { GitStatusDetails } from './GitStatusDetails';

const GitCommitListItem = (
  index: number,
  key: number | string,
  commit: GitCommitLog,
  onClickCallback: any
): any => {
  return (
    <div key={key} className={index % 2 ? 'historyItemEven' : 'historyItemOdd'}>
      {commit.commit
        ? GitCommitDetails(commit.commit, onClickCallback)
        : GitStatusDetails(onClickCallback)}
    </div>
  );
};

export { GitCommitListItem };
