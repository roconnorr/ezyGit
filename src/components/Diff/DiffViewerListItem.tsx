import React from 'react';
import { Collapse, Icon } from '@blueprintjs/core';
import Diff from './Diff';
import { IconNames } from '@blueprintjs/icons';

interface IDiffViewerProps {
  oldSource: string;
  diffType: string;
  hunks: any;
  fileName: string;
  isOpen: boolean;
}

interface IDiffViewerState {
  isOpen: boolean;
}

export default class DiffViewerListItem extends React.Component<
  IDiffViewerProps,
  IDiffViewerState
> {
  constructor(props: IDiffViewerProps) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
    };
  }

  onClickCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { oldSource, diffType, hunks, fileName } = this.props;

    return (
      <div>
        <div className="diff-item-header" onClick={this.onClickCollapse}>
          {this.state.isOpen ? (
            <Icon icon={IconNames.CHEVRON_DOWN} iconSize={Icon.SIZE_LARGE} />
          ) : (
            <Icon icon={IconNames.CHEVRON_RIGHT} iconSize={Icon.SIZE_LARGE} />
          )}
          {fileName}
        </div>
        <Collapse isOpen={this.state.isOpen}>
          <Diff hunks={hunks} diffType={diffType} oldSource={oldSource} />
        </Collapse>
      </div>
    );
  }
}
