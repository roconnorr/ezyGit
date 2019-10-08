import { BaseAction, actionIds } from '.';
import { GitCommitLog } from '../git/newGit';

export const getGitCommitLogAction = (): BaseAction => ({
  type: actionIds.GET_GIT_COMMIT_LOG,
  payload: null,
});

export const getGitCommitLogCompletedAction = (
  gitCommitLog: Array<GitCommitLog>
): BaseAction => ({
  type: actionIds.GET_GIT_COMMIT_LOG_COMPLETED,
  payload: gitCommitLog,
});
