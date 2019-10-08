import { combineReducers } from 'redux';
import commit from './commit';
import { GitCommitLog } from '../git/newGit';

export interface State {
  gitCommitLog: Array<GitCommitLog>;
}

export const rootReducers = combineReducers<State>({
  gitCommitLog: commit,
});
