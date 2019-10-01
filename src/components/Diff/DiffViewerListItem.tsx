import React from 'react';
import { Collapse, Button, Icon, Intent } from '@blueprintjs/core';
import Diff from './Diff';
import { IconNames } from '@blueprintjs/icons';
import { hashBlob } from 'isomorphic-git';
var crypto = require('crypto');

export default class DiffViewerListItem extends React.Component<
  {
    oldSource: string;
    diffType: string;
    hunks: any;
    fileName: string;
  },
  { isOpen: boolean }
> {
  state = {
    isOpen: true,
  };

  onClickCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { oldSource, diffType, hunks, fileName } = this.props;
    const isOpen = this.state;

    return (
      <div>
        <div className="diff-item-header" onClick={this.onClickCollapse}>
          <Icon
            icon={isOpen ? IconNames.CHEVRON_DOWN : IconNames.CHEVRON_UP}
            iconSize={Icon.SIZE_LARGE}
          />
          <b>{fileName}</b>
        </div>
        <Collapse {...isOpen}>
          <Diff hunks={hunks} diffType={diffType} oldSource={oldSource} />
        </Collapse>
      </div>
    );
  }
}
