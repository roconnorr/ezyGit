import React, { Component } from 'react';
import './styles/App.css';
import { NavBar } from './components/NavBar/NavBar';
import { fileChanges, onFileChange } from './git/git';

// Cleaned
import GitCommitList from './components/SideList/GitCommitList';
import DiffViewerList from './components/Diff/DiffViewerList';
// Cleaned

// Should move this into a loading HOC?
import { Intent, Spinner } from '@blueprintjs/core';

// to remove
import { Git, GitStats, GitCommitLog } from './git/newGit';
import { FileWatcher } from './git/watcher';
import { connect } from 'react-redux';


export interface IState {
  isLoaded: boolean;
  gitLog: Array<GitCommitLog> | null;
  gitCurrentBranch: string | undefined;
  // gitDiff: Array<FileStatusChanges> | null;
  gitModifiedFiles: Array<fileChanges> | null;
}
// https://isomorphic-git.org/docs/en/log

class App extends Component<
  { loadSideListGitLog: any; loadDefaultCommit: any },
  IState
> {
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
    //Listen for updates, break out into hooks or events?
    onFileChange(async () => {
      console.log('Update triggered');
    });

    let git = new Git(process.cwd() + '/', new FileWatcher());

    this.setState({
      gitCurrentBranch: await git.getCurrentBranch(),
      isLoaded: true,
    });

    git.getGitStatus(GitStats.UNSTAGED).then(() => {
      console.log('completed getting the gitStatus');
    });

    git
      .getCommitHashes(4)
      .then((hases: { targetHash: string; previousHash: Array<string> }) => {
        console.log('Hash Target: ' + hases.targetHash);
        console.log('Otheres : ' + hases.previousHash);
      });

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
