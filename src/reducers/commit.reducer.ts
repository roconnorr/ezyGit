import { BaseAction, actionIds } from '../actions';
import { GitCommitLog } from '../git/git';

export const getCommitLog = (
  state: Array<GitCommitLog> = Array<GitCommitLog>(),
  action: BaseAction
) => {
  switch (action.type) {
    case actionIds.GET_GIT_COMMIT_LOG_COMPLETED:
      return [...state, ...action.payload];
  }

  return state;
};

export default getCommitLog;
