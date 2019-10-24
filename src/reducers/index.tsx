import { combineReducers } from 'redux';
import commit from './commit.reducer';
import { GitCommitLog } from '../git/git';
import { FileStatusChanges } from '../git/git';
import getGitDiff from './gitDiff.reducer';
import setNewWorkingDirectory from './working.reducer';
import { getGitJSON } from './gitJSON.reducer';

export interface State {
  gitCommitLog: Array<GitCommitLog>;
  gitDiff: Array<FileStatusChanges>;
  gitJSON: object;
  workingDir: string;
}

export const rootReducers = combineReducers<State>({
  gitCommitLog: commit,
  gitDiff: getGitDiff,
  gitJSON: getGitJSON,
  workingDir: setNewWorkingDirectory,
});
