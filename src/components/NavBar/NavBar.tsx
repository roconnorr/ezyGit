import * as React from 'react';

import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import SearchBar, { ISearchBarProps } from '../SearchBar/SearchBar';
import { filterFilm } from '../SearchBar/SearchBarItemPredicate';
import renderFilm from '../SearchBar/SearchBarItemRenderer';

interface INavBarProps {
  branch: string;
}
const searchBarProps: ISearchBarProps = {
  itemPredicate: filterFilm,
  itemRenderer: renderFilm,
  items: [
    { name: 'pop' },
    { name: 'stash' },
    { name: 'push' },
    { name: 'pull' },
  ],
};

const NavBar = (props: INavBarProps) => {
  const { branch } = props;

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <NavbarHeading>Current: {branch ? branch : 'Loading...'}</NavbarHeading>
        <SearchBar {...searchBarProps} />
      </NavbarGroup>
    </Navbar>
  );
};

export { NavBar };
