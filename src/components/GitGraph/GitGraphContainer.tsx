import * as React from 'react';
import GitGraph from './GitGraph';
import { State } from '../../reducers';
import { connect } from 'react-redux';
import { getGitJSONAction } from '../../actions/gitJSON.action';
import { Button } from '@blueprintjs/core';

export interface IGitGraphContainerProps {
  gitJSON: object;
  fetchGitJSON: Function;
}

const GitGraphContainer: React.FunctionComponent<
  IGitGraphContainerProps
> = props => {
  return (
    <React.Fragment>
      <Button
        small
        name="Get fresh git data"
        onClick={() => props.fetchGitJSON()}
      />
      <GitGraph gitJSON={props.gitJSON} />
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchGitJSON: () => dispatch(getGitJSONAction()),
});

const mapStateToProps = (state: State) => {
  return {
    gitJSON: state.gitJSON,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitGraphContainer);
