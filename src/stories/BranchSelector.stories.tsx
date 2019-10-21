import Selector, {
  IBranch,
} from '../components/NavBar/BranchSelector/BranchSelector';
import React from 'react';

export default {
  title: 'Git Branch Selector',
};

const demoBranches: IBranch[] = [
  { name: 'master', oid: 'asdasd' },
  { name: 'stable', oid: 'asdasd' },
  { name: 'bleedingedge', oid: 'asdasd' },
];

export const selector = () => <Selector branches={demoBranches} />;
