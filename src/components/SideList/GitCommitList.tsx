import React from 'react';
import { GitCommitListItem } from './GitCommitListItem';
import Scrollbars from 'react-custom-scrollbars';
import ReactList from 'react-list';
import { AppToaster } from '../Toaster/Toaster';
import { GitCommitLog } from '../../git/newGit';
import { connect } from 'react-redux';
import { State } from '../../reducers';

interface ISideListProps {
  data: Array<GitCommitLog>;
}

export const GitCommitList = (data: Array<GitCommitLog>) => {
  const handleListItemClick = (commitOid: number) => {
    AppToaster.show({ message: 'Loading ' + commitOid });
  };

  const renderGitCommit = (index: number, key: number | string) => {
    const commit = data[index];
    return GitCommitListItem(index, key, commit, handleListItemClick);
  };

  return (
    <Scrollbars>
      <ReactList
        itemRenderer={renderGitCommit}
        length={data.length}
        type="uniform"
      />
    </Scrollbars>
  );
};

const mapStateToProps = (state: State) => ({
  data: state.gitCommitLog,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps)(GitCommitList);
