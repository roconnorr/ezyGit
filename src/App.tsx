import React, { Component } from 'react';
import './styles/App.css';
import NavBar from './components/NavBar/NavBar';
import { getGitLogAction } from './actions/gitCommitList.action';
import { getGitDiffAction } from './actions/gitDiff.action';

// Cleaned
import GitCommitList from './components/SideList/GitCommitList';
import DiffViewerList from './components/Diff/DiffViewerList';
// Cleaned

// Should move this into a loading HOC?
import { Intent, Spinner } from '@blueprintjs/core';

// to remove
import { FileChanges, GitCommitLog } from './git/git';
import { connect } from 'react-redux';
import FileWatcher, { fetchIgnoreFile } from './git/gazeWatcher';
import { State } from './reducers';
const Gaze = require('gaze').Gaze;

export interface IState {
  isLoaded: boolean;
  gitLog: Array<GitCommitLog> | null;
  gitCurrentBranch: string | undefined;
  // gitDiff: Array<FileStatusChanges> | null;
  gitModifiedFiles: Array<FileChanges> | null;
}
// https://isomorphic-git.org/docs/en/log

interface IProps {
  loadSideListGitLog: any;
  loadDefaultCommit: any;
  workingDir: string;
}

class App extends Component<IProps, IState> {
  GitDir: string = process.cwd();

  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoaded: false,
      gitLog: null,
      gitCurrentBranch: undefined,
      gitModifiedFiles: null,
    };
  }

  /**
   * This function is called by the react framework once the
   * component is first mounted into the DOM
   *
   * This is a good place to do setup
   */
  async componentDidMount() {
    this.setState({
      isLoaded: true,
    });

    // startFileWatcher(this.GitDir);
    const filesToIgnore = await fetchIgnoreFile(this.props.workingDir);
    const gaze = new Gaze(['**/*', '!**/node_modules/**'], {
      cwd: process.cwd(),
    });
    gaze.on('ready', (watcher: any) => {
      watcher.on('all', (event: any, filepath: any) => {
        console.log('Look mah! it happend' + filepath + ' was ' + event);
      });
      console.log('ready to roll!');
    });

    // A file has been added/changed/deleted has occurred

    // const temp = new FileWatcher(gaze, '');

    this.props.loadSideListGitLog();
    this.props.loadDefaultCommit();
  }

  /**
   * This function is automatically called by the react framework
   * when a "prop" or the "state" is updated.
   */
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

/**
 * This connecting the redux actions to the component as a prop
 * so that the
 */
const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitLogAction()),
  loadDefaultCommit: () => dispatch(getGitDiffAction()),
});

const mapStateToProps = (state: State) => {
  return {
    workingDir: state.workingDir,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
