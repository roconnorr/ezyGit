import React from "react";
import { fileChanges } from "../../git/git";
import { DiffViewer } from "../Editor/DiffViewer";
import Scrollbars from "react-custom-scrollbars";
import ReactList from "react-list";

interface IMainContentList {
  data: Array<fileChanges>;
}

class MainContentList extends React.Component<IMainContentList, {}> {
  itemRenderer(index: number, key: number | string) {
    return (
      <div key={key}>
        {DiffViewer(
          this.props.data[index].newState,
          this.props.data[index].originalState
        )}
      </div>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <Scrollbars>
        <ReactList
          itemRenderer={this.itemRenderer.bind(this)}
          length={data.length}
          type={"variable"}
        />
      </Scrollbars>
    );
  }
}

export { MainContentList };
