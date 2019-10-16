import { ItemPredicate } from '@blueprintjs/select';
import { ISearchItem } from './SearchBar';

export const filterGitCommand: ItemPredicate<ISearchItem> = (
  query,
  film,
  _index,
  exactMatch
) => {
  const normalizedTitle = film.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
};

export default filterGitCommand;
