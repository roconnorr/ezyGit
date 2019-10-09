import { combineReducers } from 'redux';
import commit from './commit.reducer';
import { GitCommitLog } from '../git/newGit';
import { FileStatusChanges } from '../git/git';
import getGitDiff from './gitDiff.reducer';

export interface State {
  gitCommitLog: Array<GitCommitLog>;
  gitDiff: Array<FileStatusChanges>;
}

export const rootReducers = combineReducers<State>({
  gitCommitLog: commit,
  gitDiff: getGitDiff,
});
