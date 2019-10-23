import * as React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';
import BranchSelector, { IBranch } from './BranchSelector/BranchSelector';

export interface INavBarProps {
  branch: string;
  fetchGitCommit: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = props => {
  const { branch } = props;

  const demoBranches: IBranch[] = [
    { name: 'master', oid: 'asdasd' },
    { name: 'stable', oid: 'asdasd' },
    { name: 'bleedingedge', oid: 'asdasd' },
  ];

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT} style={{ width: '70%' }}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <BranchSelector branches={demoBranches} />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button>Settings</Button>
        <Button>Commit</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
