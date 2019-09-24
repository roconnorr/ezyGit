import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "./components/Pallet/SearchBar";
import { NavBar } from "./components/NavBar/NavBar";
import { Label } from "@blueprintjs/core";
import { CommitDescriptionWithOid } from "isomorphic-git";
import { getGitLog } from "./git/git";

interface IState {
  isLoaded: boolean;
  gitLog: Array<CommitDescriptionWithOid> | null;
}
interface IProps {}
// https://isomorphic-git.org/docs/en/log

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false, gitLog: null };
  }

  async componentDidMount() {
    const temp = await getGitLog();
    this.setState({ gitLog: temp, isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div className="App">
        <NavBar />
        <SearchBar />
        <Label>
          {this.state.gitLog ? this.state.gitLog![2].message : null}
        </Label>
      </div>
    );
  }
}

export default App;
