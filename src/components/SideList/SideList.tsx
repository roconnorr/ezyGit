import React from "react";
import { GitCommitListItem } from "./GitCommitListItem";
import { CommitDescriptionWithOid } from "isomorphic-git";
import Scrollbars from "react-custom-scrollbars";
import ReactList from "react-list";

interface ISideListProps {
  data: Array<CommitDescriptionWithOid>;
}

class SideList extends React.Component<ISideListProps, {}> {
  HistoryItem(index: number, key: number | string) {
    const commit = this.props.data[index];
    return GitCommitListItem(index, key, commit);
  }

  render() {
    const { data } = this.props;
    return (
      <Scrollbars>
        <ReactList
          itemRenderer={this.HistoryItem.bind(this)}
          length={data.length}
          type="uniform"
        />
      </Scrollbars>
    );
  }
}

export { SideList };
