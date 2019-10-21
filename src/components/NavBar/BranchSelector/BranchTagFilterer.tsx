import { ItemPredicate } from '@blueprintjs/select';
import { IBranch } from './BranchSelector';

export const filerBranchTag: ItemPredicate<IBranch> = (
  query,
  branch,
  _index,
  exactMatch
) => {
  const normalizedTitle = branch.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
};

export default filerBranchTag;
