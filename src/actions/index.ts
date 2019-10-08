export interface BaseAction {
  type: string;
  payload?: any;
}

export const actionIds = {
  GET_GIT_COMMIT_LOG: 'GET_GIT_COMMIT_LOG',
  GET_GIT_COMMIT_LOG_COMPLETED: 'GET_GIT_COMMIT_LOG_COMPLETED',
};
