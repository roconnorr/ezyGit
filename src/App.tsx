import React, { Component } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
import { PopOver } from "./PopOver";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="contained">Test asd</Button>
        <PopOver />
      </div>
    );
  }
}

export default App;
