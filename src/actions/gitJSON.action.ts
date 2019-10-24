import { BaseAction, actionIds } from '.';
import { FileStatusChanges } from '../git/git';

export const getGitJSONAction = (): BaseAction => ({
  type: actionIds.LOAD_NEW_GIT_JSON,
  payload: null,
});

export const getGitJSONCompletedAction = (gitJSON: object): BaseAction => ({
  type: actionIds.LOAD_NEW_GIT_JSON_COMPLETED,
  payload: gitJSON,
});
