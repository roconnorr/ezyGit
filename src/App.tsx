import React, { Component } from 'react';
import './styles/App.css';
import { NavBar } from './components/NavBar/NavBar';

import { getGitLogAction } from './actions/gitCommitList.action';
import { getGitDiffAction } from './actions/gitDiff.action';

// Cleaned
import GitCommitList from './components/SideList/GitCommitList';
import DiffViewerList from './components/Diff/DiffViewerList';
// Cleaned

// Should move this into a loading HOC?
import { Intent, Spinner } from '@blueprintjs/core';

// to remove
import {
  GitStats,
  FileChanges,
  GitCommitLog,
  getCurrentBranch,
  getGitStatus,
  getCommitHashes,
  startFileWatcher,
} from './git/git';
import { connect } from 'react-redux';

export interface IState {
  isLoaded: boolean;
  gitLog: Array<GitCommitLog> | null;
  gitCurrentBranch: string | undefined;
  // gitDiff: Array<FileStatusChanges> | null;
  gitModifiedFiles: Array<FileChanges> | null;
}
// https://isomorphic-git.org/docs/en/log

class App extends Component<
  { loadSideListGitLog: any; loadDefaultCommit: any },
  IState
> {
  GitDir: string = process.cwd();

  constructor(props: { loadSideListGitLog: any; loadDefaultCommit: any }) {
    super(props);
    this.state = {
      isLoaded: false,
      gitLog: null,
      gitCurrentBranch: undefined,
      gitModifiedFiles: null,
    };
  }
  async componentDidMount() {
    this.setState({
      isLoaded: true,
    });

    startFileWatcher(this.GitDir);

    this.props.loadSideListGitLog();
    this.props.loadDefaultCommit();
  }

  render() {
    const { isLoaded, gitCurrentBranch } = this.state;

    return (
      <div className="App bp3-dark">
        <NavBar branch={gitCurrentBranch!} />
        {/* Make a wrapping flex box
          https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        */}
        <div className="container">
          <div className="sideBar">
            {isLoaded ? (
              <GitCommitList />
            ) : (
              <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
            )}
          </div>
          <div className="mainContent">
            <DiffViewerList />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitLogAction()),
  loadDefaultCommit: () => dispatch(getGitDiffAction()),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
