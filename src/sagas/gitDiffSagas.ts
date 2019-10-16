import { put, takeEvery, select } from 'redux-saga/effects';
import { actionIds, BaseAction } from '../actions';
import { getCommitHashes, getCommitFileDifferences } from '../git/git';
import { getGitDiffCompletedAction } from '../actions/gitDiff.action';

export function* watchLoadGitDiff() {
  yield takeEvery(actionIds.LOAD_NEW_GIT_DIFF, requestNewGitDiff);
}

function* requestNewGitDiff(action: BaseAction) {
  console.log(action);

  let dir = yield select(state => {
    return state.workingDir;
  });

  //Handles defaulting to the most recent change.
  const hashes = yield getCommitHashes(dir);

  let selected = hashes.targetHash;
  let previous = hashes.previousHash;

  if (action.payload) {
    selected = action.payload.target;
    previous = action.payload.parent;
  }

  const currentDifferences = yield getCommitFileDifferences(
    './',
    selected,
    previous
  );
  yield put(getGitDiffCompletedAction(currentDifferences));
}
