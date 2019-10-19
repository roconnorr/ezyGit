import * as React from 'react';
import { connect } from 'react-redux';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import SearchBar, { ISearchBarProps } from '../SearchBar/SearchBar';
import filterGitCommand from '../SearchBar/SearchBarItemPredicate';
import { getGitLogAction } from '../../actions/gitCommitList.action';
import renderGitCommand from '../SearchBar/SearchBarItemRenderer';

interface INavBarProps {
  branch: string;
  fecthGitCommit: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = props => {
  const searchBarProps: ISearchBarProps = {
    itemPredicate: filterGitCommand,
    itemRenderer: renderGitCommand,
    items: [
      { name: 'pop', action: '' },
      { name: 'stash', action: '' },
      { name: 'push', action: '' },
      { name: 'pull', action: '' },
      { name: 'fetch', action: props.fecthGitCommit() },
    ],
  };

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

const mapDispatchToProps = (dispatch: any) => ({
  fecthGitCommit: () => dispatch(getGitLogAction()),
});

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
