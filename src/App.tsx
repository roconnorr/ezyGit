import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "./components/Pallet/SearchBar";

interface IState {
  isLoaded: boolean;
}
interface IProps {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false };
  }

  async componentDidMount() {}

  render() {
    const { isLoaded } = this.state;
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
