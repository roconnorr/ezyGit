import { BaseAction, actionIds } from '../actions';
import { FileStatusChanges } from '../git/git';

export const getGitDiff = (
  state: Array<FileStatusChanges> = Array<FileStatusChanges>(),
  action: BaseAction
) => {
  switch (action.type) {
    case actionIds.LOAD_NEW_GIT_DIFF_COMPLETED: {
      return [...action.payload];
    }
  }

  return state;
};

export default getGitDiff;
