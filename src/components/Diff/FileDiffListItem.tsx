import React, { Component } from "react";
import { Label, Button, Collapse } from "@blueprintjs/core";
import { DiffViewer } from "./DiffViewer";
import { fileChanges } from "../../git/git";

interface IMainContentList {
  collapsed: boolean;
}

interface IMainContentListProps {
  gitDiff: fileChanges;
  key: number | string;
}

class FileDiffListItem extends Component<
  IMainContentListProps,
  IMainContentList
> {
  public readonly state: Readonly<IMainContentList> = {
    collapsed: true
  };

  private handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { gitDiff, key } = this.props;

    return (
      <div key={key} style={{ padding: "10px" }}>
        <Button onClick={this.handleClick}>{gitDiff.fileName}</Button>
        <Collapse isOpen={this.state.collapsed}>
          {DiffViewer(gitDiff.newState, gitDiff.originalState)}
        </Collapse>
      </div>
    );
  }
}

export { FileDiffListItem };
