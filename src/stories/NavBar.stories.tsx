import React from 'react';
import NavBar, {INavBarProps} from '../components/NavBar/NavBar';

export default {
  title: 'NavBar',
};

const navBarProps: INavBarProps = {
  branch: 'branchy branch',
  fetchGitCommit: 'committy commit',
};

export const bar = () => <NavBar {...navBarProps} />;
