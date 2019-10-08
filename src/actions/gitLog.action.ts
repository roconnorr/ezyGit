import { BaseAction, actionIds } from '.';
import { GitCommitLog } from '../git/newGit';

export const getGitLogAction = (): BaseAction => ({
  type: actionIds.GET_GIT_COMMIT_LOG,
  payload: null,
});

export const getGitLogCompletedAction = (
  gitLog: Array<GitCommitLog>
): BaseAction =>
  ({
    type: actionIds.GET_GIT_COMMIT_LOG_COMPLETED,
    payload: gitLog,
  });
