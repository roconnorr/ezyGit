import * as React from 'react';
import { MultiSelect } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import renderBranchTag from './BranchTagRenderer';

export interface IBranch {
  name: string;
  iod: string;
}

const BranchSelector = MultiSelect.ofType<IBranch>();

//Probs make all of these redux actions
const handleClear = () =>
  console.log('Make redux action to set selected branches HERE!');

const handlePaste = (branches: IBranch[]) => {
  // add em to redux
  console.log('stuff pasted. add to redux');
};

const branchesEqual = (branchA: IBranch, branchB: IBranch) => {
  return branchA.name === branchB.name;
};

const handleSelect = (branch: IBranch) => {
  // if (!this.isFilmSelected(film)) {
  //   this.selectFilm(film);
  // } else {
  //   this.deselectFilm(this.getSelectedFilmIndex(film));
  // }
  console.log('Something was selected YOO!');
};

const Selector = (branches: IBranch[], selectedBranches: IBranch[]) => {
  const clearButton =
    selectedBranches.length > 0 ? (
      <Button icon="cross" minimal={true} onClick={handleClear} />
    ) : (
      undefined
    );

  return (
    <BranchSelector
      itemRenderer={renderBranchTag}
      itemsEqual={branchesEqual}
      items={branches}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={handleSelect}
      onItemsPaste={handlePaste}
      popoverProps={{ minimal: true }} // use less fancy one. Looks better IMO
      tagRenderer={(branch: IBranch) => branch.name}
      tagInputProps={{
        rightElement: clearButton,
        tagProps: { minimal: true },
      }}
      selectedItems={selectedBranches}
    />
  );
};

export default Selector;
