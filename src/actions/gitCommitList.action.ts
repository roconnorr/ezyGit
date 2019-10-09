import { BaseAction, actionIds } from '.';
import { GitCommitLog } from '../git/newGit';

export const getGitLogAction = (commitHash: string = ''): BaseAction => ({
  type: actionIds.GET_GIT_COMMIT_LOG,
  payload: commitHash,
});

export const getGitLogCompletedAction = (
  gitLog: Array<GitCommitLog>
): BaseAction => ({
  type: actionIds.GET_GIT_COMMIT_LOG_COMPLETED,
  payload: gitLog,
});
