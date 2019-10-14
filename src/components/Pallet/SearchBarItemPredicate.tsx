import { ItemPredicate } from '@blueprintjs/select';
import { ICommand } from './SearchBar';

export const filterFilm: ItemPredicate<ICommand> = (
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
