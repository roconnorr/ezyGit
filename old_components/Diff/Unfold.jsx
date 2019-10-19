import React, { PureComponent } from 'react';
import { Decoration } from 'react-diff-view';
import { Icon } from '@blueprintjs/core';
const ICON_TYPE_MAPPING = {
  up: 'chevron-up',
  down: 'chevron-down',
  none: 'plus',
};

export default class Unfold extends PureComponent {
  expand() {
    const { start, end, onExpand } = this.props;
    onExpand(start, end);
  }

  render() {
    const { start, end, direction, ...props } = this.props;
    const iconType = ICON_TYPE_MAPPING[direction];
    const lines = end - start;

    return (
      <Decoration {...props}>
        <div onClick={this.expand.bind(this)}>
          <Icon icon={iconType} />
          &nbsp;Expand hidden {lines} lines
        </div>
      </Decoration>
    );
  }
}
