import * as React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

interface INavBarProps {
  branch: string;
  fecthGitCommit: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = props => {
  const { branch } = props;

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <NavbarHeading>Current: {branch ? branch : 'Loading...'}</NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
