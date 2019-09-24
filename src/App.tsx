import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "./components/Pallet/SearchBar";
import { NavBar } from "./components/NavBar/NavBar";
import { Label, Colors } from "@blueprintjs/core";
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

        {/* Make a wrapping flex box
          https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        */}
        <div className="container" style={{ color: Colors.BLACK }}>
          Side bar goes here
        </div>
        <div className="container" style={{ color: Colors.GOLD1 }}>
          Main content here
        </div>
      </div>
    );
  }
}

export default App;
