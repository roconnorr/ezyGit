import * as React from 'react';

import {
  Button,
  Hotkey,
  Hotkeys,
  HotkeysTarget,
  MenuItem,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { Omnibar, ItemRenderer, ItemPredicate } from '@blueprintjs/select';

interface ICommand {
  name: string;
}

const FilmOmnibar = Omnibar.ofType<ICommand>();

const renderFilm: ItemRenderer<ICommand> = (
  command,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${command.name}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={command.name}
      key={command.name}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

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

const filmSelectProps = {
  itemPredicate: filterFilm,
  itemRenderer: renderFilm,
  items: [
    { name: 'pop' },
    { name: 'stash' },
    { name: 'push' },
    { name: 'pull' },
  ],
};
function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '$1');
}

export interface ISearchBarState {
  isOpen: boolean;
}

@HotkeysTarget
export class SearchBar extends React.PureComponent {
  public state: ISearchBarState = {
    isOpen: false,
  };

  private toaster!: Toaster;
  private refHandlers = {
    toaster: (ref: Toaster) => (this.toaster = ref),
  };

  public renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="ctrl + p"
          label="Show Omnibar"
          onKeyDown={this.handleToggle}
          // prevent typing "O" in omnibar input
          preventDefault={true}
        />
      </Hotkeys>
    );
  }

  public render() {
    return (
      <div>
        <span>
          <Button text="Show Omnibar" onClick={this.handleClick} />
        </span>

        <FilmOmnibar
          {...filmSelectProps}
          {...this.state}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleItemSelect}
          onClose={this.handleClose}
        />
        <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />
      </div>
    );
  }

  private handleClick = (_event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpen: true });
  };

  private handleItemSelect = (film: ICommand) => {
    this.setState({ isOpen: false });

    this.toaster.show({
      message: (
        <span>
          You selected <strong>{film.name}</strong>.
        </span>
      ),
    });
  };

  private handleClose = () => this.setState({ isOpen: false });

  private handleToggle = () => this.setState({ isOpen: !this.state.isOpen });
}
