import { BaseAction, actionIds } from '.';
import { FileStatusChanges } from '../git/git';

export const getGitDiffAction = (): BaseAction => ({
  type: actionIds.LOAD_NEW_GIT_DIFF,
  payload: null,
});

export const getGitDiffCompletedAction = (
  gitDiff: Array<FileStatusChanges>
): BaseAction => ({
  type: actionIds.LOAD_NEW_GIT_DIFF_COMPLETED,
  payload: gitDiff,
});
