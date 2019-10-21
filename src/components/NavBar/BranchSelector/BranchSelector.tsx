import * as React from 'react';

import { Button, MenuItem } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import renderBranchTag from './BranchTagRenderer';
import filerBranchTag from './BranchTagFilterer';

export interface IBranch {
  name: string;
  oid: string;
}

export interface IBranchSelectorState {
  allowCreate: boolean;
  fill: boolean;
  selectedBranches: IBranch[];
  openOnKeyDown: boolean;
  popoverMinimal: boolean;
  resetOnSelect: boolean;
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
    openOnKeyDown: true,
    popoverMinimal: true,
    resetOnSelect: true,
  };

  public render() {
    const { selectedBranches, popoverMinimal, openOnKeyDown } = this.state;

    const { branches } = this.props;
    const clearButton =
      selectedBranches.length > 0 ? (
        <Button icon="cross" minimal={true} onClick={this.handleClear} />
      ) : (
        undefined
      );

    return (
      <BranchMultiSelector
        openOnKeyDown={openOnKeyDown}
        placeholder={'Search Git Branch Name'}
        resetOnSelect={true}
        itemPredicate={filerBranchTag}
        itemRenderer={renderBranchTag}
        // we may customize the default branchSelectProps.items by
        // adding newly created items to the list, so pass our own
        items={branches}
        tagInputProps={{
          rightElement: clearButton,
          onRemove: this.handleTagRemove,
        }}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={this.handlebranchSelect}
        onItemsPaste={this.handlebranchsPaste}
        popoverProps={{ minimal: popoverMinimal }}
        tagRenderer={this.renderTag}
        selectedItems={this.state.selectedBranches}
      />
    );
  }

  private renderTag = (branch: IBranch) => branch.name;

  private handleTagRemove = (_tag: string, index: number) => {
    this.deselectbranch(index);
  };

  private getSelectedbranchIndex(branch: IBranch) {
    return this.state.selectedBranches.indexOf(branch);
  }

  private isbranchSelected(branch: IBranch) {
    return this.getSelectedbranchIndex(branch) !== -1;
  }

  private selectbranch(branch: IBranch) {
    this.selectbranchs([branch]);
  }

  private selectbranchs(branchsToSelect: IBranch[]) {
    const { selectedBranches } = this.state;
    this.setState({
      selectedBranches: selectedBranches.concat(branchsToSelect),
    });
  }

  private deselectbranch(index: number) {
    const { selectedBranches } = this.state;

    const newSet = selectedBranches.filter(
      (_selectedBranches, i) => i !== index
    );

    this.setState({ selectedBranches: newSet });
  }

  private handlebranchSelect = (branch: IBranch) => {
    if (!this.isbranchSelected(branch)) {
      this.selectbranch(branch);
    } else {
      this.deselectbranch(this.getSelectedbranchIndex(branch));
    }
  };

  private handlebranchsPaste = (branchs: IBranch[]) => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    this.selectbranchs(branchs);
  };

  private handleClear = () => this.setState({ selectedBranches: [] });
}

export default BranchSelector;
