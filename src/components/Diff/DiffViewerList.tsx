import React from 'react';
import { getGitDifference } from './GetGitDifference';
import { FileStatusChanges } from '../../git/git';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';
import DiffViewerListItem from './DiffViewerListItem';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Button } from '@blueprintjs/core';

interface IDiffViewerProps {
  gitDiff: FileStatusChanges[];
}

interface IState {
  collapsedAll: boolean;
  collapsedInt: Array<boolean>;
}

export class DiffViewerList extends React.Component<IDiffViewerProps, IState> {
  state = {
    collapsedAll: false,
    collapsedInt: Array<boolean>(),
  };

  componentDidUpdate() {
    const { gitDiff } = this.props;

    const tempLen = gitDiff.map(() => true);

    // this.setState({ collapsedInt: tempLen });
    console.log('YAYAYYAYA', this.state.collapsedInt, this.props.gitDiff);
  }

  // TODO CLEAN THIS UP
  onClickCollapse = (key: number) => {
    let temp = this.state.collapsedInt;
    temp[key] = !temp[key];
    this.setState({ collapsedInt: temp });
  };

  collapseAll = () => {
    const { collapsedAll } = this.state;
    console.log(collapsedAll);

    this.setState({ collapsedAll: !collapsedAll });
    const temp = this.state.collapsedInt.map(() => {
      return this.state.collapsedAll;
    });
    this.setState({ collapsedInt: temp });
  };
  // END CLEAN

  renderGitCommit = (index: number, key: number | string) => {
    const record = this.props.gitDiff[index];
    const [diff] = getGitDifference(record.modified, record.original);

    return (
      <DiffViewerListItem
        key={index}
        hunks={diff.hunks}
        diffType={diff.type}
        oldSource={record.original}
        fileName={record.path}
        isOpen={this.state.collapsedInt[index]}
        onClickCollapse={this.onClickCollapse}
        index={index}
      />
    );
  };

  render() {
    const { collapsedAll } = this.state;
    const { gitDiff } = this.props;

    return (
      <>
        <Button small onClick={() => this.collapseAll()}>
          {collapsedAll ? 'Open All' : 'Collapse All'}
        </Button>
        <Scrollbars>
          <ReactList
            itemRenderer={this.renderGitCommit}
            length={gitDiff.length}
            type="variable"
            threshold={5000}
          />
        </Scrollbars>
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    gitDiff: state.gitDiff,
  };
};

export default connect(mapStateToProps)(DiffViewerList);
