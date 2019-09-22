import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { PopOver } from "./components/popOver";

function App() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Test asd
      </Button>

      <PopOver />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
