import React, { Component } from 'react';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import {
  getGitLog,
  getCurrentBranch,
  compareChanges,
  fileChanges,
  getModifiedFiles,
} from './git/git';

import { GitCommitList } from './components/SideList/GitCommitList';
import { Intent, Spinner } from '@blueprintjs/core';
import { MainContentList } from './components/Diff/MainContentList';
import { NewDiff } from './components/Diff/Diff';

interface IState {
  isLoaded: boolean;
  gitLog: Array<CommitDescriptionWithOid> | null;
  gitCurrentBranch: string | undefined;
  gitDiff: Array<fileChanges> | null;
  gitModifiedFiles: Array<fileChanges> | null;
}
interface IProps {}
// https://isomorphic-git.org/docs/en/log

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
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
    Promise.all([getGitLog(), getCurrentBranch()]).then(values => {
      this.setState({
        gitLog: values[0],
        isLoaded: true,
        gitCurrentBranch: values[1],
      });
    });

    const temp = await compareChanges();
    this.setState({ gitDiff: temp });

    console.log(await getModifiedFiles());
  }

  render() {
    const { isLoaded, gitLog, gitCurrentBranch, gitDiff } = this.state;
    const temp = this.state.gitDiff ? this.state.gitDiff![0] : null;
    return (
      <div className="App bp3-dark">
        <NavBar branch={gitCurrentBranch!} />
        {/* Make a wrapping flex box
          https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        */}
        <div className="container">
          <div className="sideBar">
            {isLoaded ? (
              <GitCommitList data={gitLog!} />
            ) : (
              <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
            )}
          </div>
          <div className="mainContent">
            {temp ? (
              <NewDiff
                originText={temp!.newState}
                changedText={temp!.originalState}
              />
            ) : null}
            {/* {gitDiff ? <MainContentList data={gitDiff} /> : null} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
