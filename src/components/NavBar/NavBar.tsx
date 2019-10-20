import * as React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';
import Selector from './BranchSelector/Selector';

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
        <NavbarHeading>
          Current Branch: {branch ? branch : 'Loading...'}
        </NavbarHeading>
        <NavbarDivider />
        TODO SELECTOR
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button>Settings</Button>
        <Button>Commit</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
