import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "./components/Pallet/SearchBar";
import { NavBar } from "./components/NavBar/NavBar";

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
        <NavBar />
        <SearchBar />
      </div>
    );
  }
}

export default App;
