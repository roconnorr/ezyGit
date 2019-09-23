import * as React from "react";

import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch
} from "@blueprintjs/core";
import {
  Example,
  handleBooleanChange,
  IExampleProps
} from "@blueprintjs/docs-theme";

export interface INavbarExampleState {
  alignRight: boolean;
}

export class NavBar extends React.PureComponent {
  public state: INavbarExampleState = {
    alignRight: false
  };

  private handleAlignRightChange = handleBooleanChange(alignRight =>
    this.setState({ alignRight })
  );

  public render() {
    const { alignRight } = this.state;

    return (
      <Navbar>
        <NavbarGroup align={alignRight ? Alignment.RIGHT : Alignment.LEFT}>
          <NavbarHeading>ezyGit</NavbarHeading>
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="home" text="Home" />
          <Button className={Classes.MINIMAL} icon="document" text="Files" />
        </NavbarGroup>
      </Navbar>
    );
  }
}
