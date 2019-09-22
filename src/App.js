import React, { Component } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { PopOver } from "./PopOver";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="contained" color="primary">
          Test asd
        </Button>

        <PopOver />
      </div>
    );
  }
}

export default App;
