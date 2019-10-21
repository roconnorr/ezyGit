import * as React from 'react';

import { Button, MenuItem } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import renderBranchTag from './BranchTagRenderer';

export interface IBranch {
  name: string;
  oid: string;
}

export interface IBranchSelectorState {
  allowCreate: boolean;
  fill: boolean;
  selectedBranches: IBranch[];
  hasInitialContent: boolean;
  intent: boolean;
  openOnKeyDown: boolean;
  popoverMinimal: boolean;
  resetOnSelect: boolean;
  tagMinimal: boolean;
}

const BranchMultiSelector = MultiSelect.ofType<IBranch>();

export class BranchSelector extends React.PureComponent<
  { branches: IBranch[] },
  IBranchSelectorState
> {
  public state: IBranchSelectorState = {
    allowCreate: false,
    fill: false,
    selectedBranches: [],
    hasInitialContent: false,
    intent: false,
    openOnKeyDown: false,
    popoverMinimal: true,
    resetOnSelect: true,
    tagMinimal: false,
  };

  public render() {
    const {
      allowCreate,
      selectedBranches,
      hasInitialContent,
      tagMinimal,
      popoverMinimal,
      ...flags
    } = this.state;

    const { branches } = this.props;
    const clearButton =
      selectedBranches.length > 0 ? (
        <Button icon="cross" minimal={true} onClick={this.handleClear} />
      ) : (
        undefined
      );

    const branchesEqual = (branchA: IBranch, branchB: IBranch) => {
      return branchA.name === branchB.name;
    };

    return (
      <BranchMultiSelector
        // {...filmSelectProps}
        {...flags}
        itemRenderer={renderBranchTag}
        itemsEqual={branchesEqual}
        // we may customize the default filmSelectProps.items by
        // adding newly created items to the list, so pass our own
        items={branches}
        tagInputProps={{
          rightElement: clearButton,
          onRemove: this.handleTagRemove,
        }}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={this.handleFilmSelect}
        onItemsPaste={this.handleFilmsPaste}
        popoverProps={{ minimal: popoverMinimal }}
        tagRenderer={this.renderTag}
        selectedItems={this.state.selectedBranches}
      />
    );
  }

  private renderTag = (branch: IBranch) => branch.name;

  private handleTagRemove = (_tag: string, index: number) => {
    this.deselectFilm(index);
  };

  private getSelectedFilmIndex(film: IBranch) {
    return this.state.selectedBranches.indexOf(film);
  }

  private isFilmSelected(film: IBranch) {
    return this.getSelectedFilmIndex(film) !== -1;
  }

  private selectFilm(film: IBranch) {
    this.selectFilms([film]);
  }

  private selectFilms(filmsToSelect: IBranch[]) {
    const { selectedBranches } = this.state;
    this.setState({ selectedBranches: selectedBranches.concat(filmsToSelect) });
  }

  private deselectFilm(index: number) {
    const { selectedBranches } = this.state;

    const newSet = selectedBranches.filter(
      (_selectedBranches, i) => i !== index
    );

    this.setState({ selectedBranches: newSet });
  }

  private handleFilmSelect = (film: IBranch) => {
    if (!this.isFilmSelected(film)) {
      this.selectFilm(film);
    } else {
      this.deselectFilm(this.getSelectedFilmIndex(film));
    }
  };

  private handleFilmsPaste = (films: IBranch[]) => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    this.selectFilms(films);
  };

  private handleClear = () => this.setState({ selectedBranches: [] });
}

export default BranchSelector;
