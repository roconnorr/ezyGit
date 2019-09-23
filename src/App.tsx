import React, { Component } from "react";
import "./App.css";
import { Button, Label, Dimmer, Loader } from "semantic-ui-react";
import { PopOver } from "./PopOver";
import { getStatus } from "./git/git";
import { StatusResult } from "simple-git/promise";
import Header from "./components/header";

interface IState {
  isLoaded: boolean;
  gitStatus: StatusResult | null;
}
interface IProps {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false, gitStatus: null };
  }

  async componentDidMount() {
    this.setState({ isLoaded: false });
    const status = await getStatus();

    console.log(status);
    this.setState({ isLoaded: true, gitStatus: status });
  }

  render() {
    const { isLoaded, gitStatus } = this.state;
    return (
      <div className="App">
        {isLoaded ? (
          Header(gitStatus!)
        ) : (
          <Dimmer inverted active>
            <Loader />
          </Dimmer>
        )}
        <Button variant="contained">Test asd</Button>
        <PopOver />
      </div>
    );
  }
}

export default App;
