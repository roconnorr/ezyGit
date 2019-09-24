import * as React from "react";

import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";

interface INavBarProps {
  branch: string;
}

const NavBar = (props: INavBarProps) => {
  const { branch } = props;

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <NavbarHeading>Current: {branch ? branch : "Loading..."}</NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
};

export { NavBar };
