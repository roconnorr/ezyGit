import React, { Component } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { CommitDescriptionWithOid } from "isomorphic-git";
import { getGitLog, getCurrentBranch, compareChanges } from "./git/git";
import { SideList } from "./components/SideList/SideList";
import { Intent, Spinner } from "@blueprintjs/core";
import { getEditor } from "./components/Editor/Editor";
import { DiffViewer } from "./components/Editor/DiffViewer";

interface IState {
  isLoaded: boolean;
  gitLog: Array<CommitDescriptionWithOid> | null;
  gitCurrentBranch: string | undefined;
  gitDiff: Array<string>;
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
      gitDiff: [""]
    };
  }

  async componentDidMount() {
    Promise.all([getGitLog(), getCurrentBranch()]).then(values => {
      this.setState({
        gitLog: values[0],
        isLoaded: true,
        gitCurrentBranch: values[1]
      });
    });

    const temp = await compareChanges();
    this.setState({ gitDiff: temp });
  }

  render() {
    const { isLoaded, gitLog, gitCurrentBranch, gitDiff } = this.state;

    const options = {
      selectOnLineNumbers: false,
      automaticLayout: true,
      readOnly: true
    };
    return (
      <div className="App bp3-dark">
        <NavBar branch={gitCurrentBranch!} />

        {/* Make a wrapping flex box
          https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        */}
        <div className="container">
          <div className="sideBar">
            {isLoaded ? (
              <SideList data={gitLog!} />
            ) : (
              <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
            )}
          </div>
          <div className="mainContent">
            {/* {getEditor(options, gitDiff[1], gitDiff[0])} */}

            {DiffViewer(gitDiff[1], gitDiff[0])}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
