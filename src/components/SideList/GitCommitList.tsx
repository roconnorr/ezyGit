import React from 'react';
import { GitCommitListItem } from './GitCommitListItem';
import Scrollbars from 'react-custom-scrollbars';
import ReactList from 'react-list';
import { AppToaster } from '../Toaster/Toaster';
import { GitCommitLog } from '../../git/newGit';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { getGitLogAction } from '../../actions/gitCommitList.action';

interface ISideListProps {
  data: Array<GitCommitLog>;
  loadCommitDiff: any;
}

export const GitCommitList: React.FunctionComponent<ISideListProps> = props => {
  const handleListItemClick = (commitOid: number) => {
    AppToaster.show({ message: 'Loading ' + commitOid });
    props.loadCommitDiff(commitOid);
  };

  const renderGitCommit = (index: number, key: number | string) => {
    const commit = props.data[index];
    return GitCommitListItem(index, key, commit, handleListItemClick);
  };

  return (
    <Scrollbars>
      <ReactList
        itemRenderer={renderGitCommit}
        length={props.data.length}
        type="uniform"
      />
    </Scrollbars>
  );
};

const mapStateToProps = (state: State) => ({
  data: state.gitCommitLog!,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadCommitDiff: () => dispatch(getGitLogAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitCommitList);
