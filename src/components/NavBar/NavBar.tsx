import * as React from 'react';

import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { SearchBar } from '../Pallet/SearchBar';

interface INavBarProps {
  branch: string;
}

const NavBar = (props: INavBarProps) => {
  const { branch } = props;

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <NavbarHeading>Current: {branch ? branch : 'Loading...'}</NavbarHeading>
        <SearchBar />
      </NavbarGroup>
    </Navbar>
  );
};

export { NavBar };
