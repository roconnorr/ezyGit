import React, { Component } from "react";
import "./App.css";
import { Button, Label, Dimmer, Loader } from "semantic-ui-react";
import { PopOver } from "./PopOver";
import { getStatus } from "./git/git";
import { StatusResult } from "simple-git/promise";

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
    const status = await getStatus("");
    this.setState({ isLoaded: true, gitStatus: status });
  }

  render() {
    const isLoaded = this.state.isLoaded;

    console.log(this.state);

    return (
      <div className="App">
        <Button variant="contained">Test asd</Button>
        <PopOver />
        {isLoaded ? (
          <Label>Branch: {this.state.gitStatus!.current}</Label>
        ) : (
          <Dimmer inverted active>
            <Loader />
          </Dimmer>
        )}
      </div>
    );
  }
}

export default App;
