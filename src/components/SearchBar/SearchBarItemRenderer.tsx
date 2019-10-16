import React from 'react';
import { ItemRenderer } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import highlightText from './TextHighter';
import { ISearchItem } from './SearchBar';

const renderGitCommand: ItemRenderer<ICommand> = (
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

export default renderGitCommand;
