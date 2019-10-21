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
import { connect } from 'react-redux';

const SearchOmniBar = Omnibar.ofType<ISearchItem>();

export interface ISearchBarState {
  isOpen: boolean;
}

export interface ISearchItem {
  name: string;
  action: any;
}

export interface ISearchBarProps {
  itemPredicate: ItemPredicate<ISearchItem>;
  itemRenderer: ItemRenderer<ISearchItem>;
  items: ISearchItem[];
}

@HotkeysTarget
class SearchBar extends React.PureComponent<ISearchBarProps, ISearchBarState> {
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

        <SearchOmniBar
          {...this.props}
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

  private handleItemSelect = (film: ISearchItem) => {
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

export default connect()(SearchBar);
