import React from "react";
import { fileChanges } from "../../git/git";
import Scrollbars from "react-custom-scrollbars";
import ReactList from "react-list";
import { FileDiffListItem } from "./FileDiffListItem";

interface IMainContentList {
  data: Array<fileChanges>;
}

class MainContentList extends React.Component<IMainContentList, {}> {
  itemRenderer(index: number, key: number | string) {
    const gitDiff = this.props.data[index];
    return <FileDiffListItem gitDiff={gitDiff} key={key} />;
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
