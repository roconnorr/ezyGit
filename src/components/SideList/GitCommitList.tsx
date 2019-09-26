import React from "react";
import { GitCommitListItem } from "./GitCommitListItem";
import { CommitDescriptionWithOid } from "isomorphic-git";
import Scrollbars from "react-custom-scrollbars";
import ReactList from "react-list";
import { AppToaster } from "../Toaster/Toaster";

interface ISideListProps {
  data: Array<CommitDescriptionWithOid>;
}

class GitCommitList extends React.Component<ISideListProps, {}> {
  handleListItemClick = (commitOid: number) => {
    console.log(commitOid);
    AppToaster.show({ message: "Loading " + commitOid });
  };

  renderGitCommit(index: number, key: number | string) {
    const commit = this.props.data[index];
    return GitCommitListItem(index, key, commit, this.handleListItemClick);
  }

  render() {
    const { data } = this.props;
    return (
      <Scrollbars>
        <ReactList
          itemRenderer={this.renderGitCommit.bind(this)}
          length={data.length}
          type="uniform"
        />
      </Scrollbars>
    );
  }
}

export { GitCommitList };
