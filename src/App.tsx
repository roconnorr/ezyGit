import React, { Component } from 'react';
import './styles/App.css';
import { NavBar } from './components/NavBar/NavBar';
import {
  getCommitFileDifferences,
  fileChanges,
  getCommitHashes,
  FileStatusChanges,
  onFileChange,
} from './git/git';

import GitCommitList from './components/SideList/GitCommitList';
import { Intent, Spinner } from '@blueprintjs/core';
import { DiffViewerList } from './components/Diff/DiffViewerList';
import { Git, GitStats, GitCommitLog } from './git/newGit';
import { FileWatcher } from './git/watcher';
import { connect } from 'react-redux';
import { getGitCommitLogAction } from './actions/gitCommitList.action';

export interface IState {
  isLoaded: boolean;
  gitLog: Array<GitCommitLog> | null;
  gitCurrentBranch: string | undefined;
  gitDiff: Array<FileStatusChanges> | null;
  gitModifiedFiles: Array<fileChanges> | null;
}
// https://isomorphic-git.org/docs/en/log

class App extends Component<{ loadSideListGitLog: any }, IState> {
  constructor(props: { loadSideListGitLog: any }) {
    super(props);
    this.state = {
      isLoaded: false,
      gitLog: null,
      gitCurrentBranch: undefined,
      gitDiff: null,
      gitModifiedFiles: null,
    };
  }

  async componentDidMount() {
    const hashes = await getCommitHashes();
    const getCurrentFileDifferences = await getCommitFileDifferences(
      hashes.targetHash,
      hashes.previousHash
    );

    // console.log(await getCurrentCommitChanges(await getModifiedFiles()));

    //Listen for updates, break out into hooks or events?
    onFileChange(async () => {
      console.log('Update triggered');
      // const temp = await compareChanges();
      // this.setState({ gitDiff: temp });
    });

    let git = new Git(process.cwd() + '/', new FileWatcher());
    console.log('New Git Stuff!');

    this.setState({
      gitDiff: getCurrentFileDifferences,
      gitCurrentBranch: await git.getCurrentBranch(),
      isLoaded: true,
    });

    git.getGitStatus(GitStats.UNSTAGED).then(() => {
      console.log('completed ');
    });

    this.props.loadSideListGitLog();
  }

  render() {
    const { isLoaded, gitCurrentBranch, gitDiff } = this.state;

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
            {gitDiff ? DiffViewerList(gitDiff!) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitCommitLogAction()),
});

export default connect(null, mapDispatchToProps)(App);
