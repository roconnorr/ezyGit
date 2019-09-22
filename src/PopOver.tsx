import React, { Component } from "react"; // let's also import Component
import { Button, Input } from "semantic-ui-react";
import Popup from "reactjs-popup";

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type PopOverState = {
  open: boolean;
};

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class PopOver extends Component<{}, PopOverState> {
  // state: ReadOnly<PopOverState> = {
  //   open: false
  // };

  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // render will know everything!
  render() {
    return (
      <Popup trigger={<Button> Open Modal </Button>} modal closeOnDocumentClick>
        <Input />
      </Popup>
    );
  }
}
