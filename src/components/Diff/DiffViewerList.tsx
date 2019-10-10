import React, { useState } from 'react';
import { getGitDifference } from './GetGitDifference';
import { FileStatusChanges } from '../../git/git';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';
import DiffViewerListItem from './DiffViewerListItem';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Button } from '@blueprintjs/core';

interface IDiffViewerProps {
  gitDiff: Array<FileStatusChanges>;
}

export const DiffViewerList: React.FunctionComponent<any> = props => {
  const [isOpenProp, isOpenHook] = useState(true);

  const renderGitCommit = (index: number, key: number | string) => {
    const record = props.gitDiff[index];
    const [diff] = getGitDifference(record.modified, record.original);

    return (
      <DiffViewerListItem
        key={index}
        hunks={diff.hunks}
        diffType={diff.type}
        oldSource={record.original}
        fileName={record.path}
        isOpen={isOpenProp}
      />
    );
  };

  return props.gitDiff ? (
    <>
      <Button
        small
        onClick={() => {
          console.log(isOpenProp);
          isOpenHook(!isOpenProp);
        }}
      >
        Collapse All
      </Button>
      <Scrollbars>
        {isOpenProp ? 'YUe' : 'noooo'}
        <ReactList
          itemRenderer={renderGitCommit}
          length={props.gitDiff.length}
          type="variable"
          threshold={5000}
        />
      </Scrollbars>
    </>
  ) : null;
};

const mapStateToProps = (state: State) => {
  return {
    gitDiff: state.gitDiff,
  };
};

export default connect(
  mapStateToProps,
  null
)(DiffViewerList);
