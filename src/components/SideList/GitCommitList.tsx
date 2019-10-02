import React from 'react';
import { GitCommitListItem } from './GitCommitListItem';
import Scrollbars from 'react-custom-scrollbars';
import ReactList from 'react-list';
import { AppToaster } from '../Toaster/Toaster';
import { GitCommitLog } from '../../git/newGit';

interface ISideListProps {
  data: Array<GitCommitLog>;
}

class GitCommitList extends React.Component<ISideListProps, {}> {
  handleListItemClick = (commitOid: number) => {
    console.log(commitOid);
    AppToaster.show({ message: 'Loading ' + commitOid });
  };

  renderGitCommit = (index: number, key: number | string) => {
    const commit = this.props.data[index];
    return GitCommitListItem(index, key, commit, this.handleListItemClick);
  };

  render() {
    const { data } = this.props;
    return (
      <Scrollbars>
        <ReactList
          itemRenderer={this.renderGitCommit}
          length={data.length}
          type="uniform"
        />
      </Scrollbars>
    );
  }
}

export { GitCommitList };
