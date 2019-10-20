import Selector, {
  IBranch,
} from '../components/NavBar/BranchSelector/Selector';

export default {
  title: 'Git Branch Selector',
};

const selectedBranches: IBranch[] = [
  {
    name: 'asd',
    iod: 'asd',
  },
];

const branches: IBranch[] = [
  {
    name: 'Another Branch',
    iod: 'asd',
  },
  {
    name: 'asd',
    iod: 'asd',
  },
];

export const selector = () => Selector(branches, selectedBranches);
