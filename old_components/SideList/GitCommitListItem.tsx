import React from 'react';
import { GitCommitLog } from '../../git/git';
import GitCommitDetails from './GitCommitDetails';
import { GitStatusDetails } from './GitStatusDetails';

const GitCommitListItem = (
  index: number,
  key: number | string,
  commit: GitCommitLog,
  onClickCallback: (oid: string, parent: string) => void
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
