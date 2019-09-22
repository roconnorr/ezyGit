import React, { Component } from "react";
import "./App.css";
import { Button, Label } from "semantic-ui-react";
import { PopOver } from "./PopOver";
import { status } from "./git/git";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="contained">Test asd</Button>
        <PopOver />
        {/* <Label>{status("")}</Label> */}
        <Label>Branch: {status("").current}</Label>
      </div>
    );
  }
}

export default App;
