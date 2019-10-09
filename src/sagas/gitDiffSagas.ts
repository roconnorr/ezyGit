import { put, takeEvery } from 'redux-saga/effects';
import { actionIds, BaseAction } from '../actions';
import { getCommitHashes, getCommitFileDifferences } from '../git/git';
import { getGitDiffCompletedAction } from '../actions/gitDiff.action';

export function* watchLoadGitDiff() {
  yield takeEvery(actionIds.LOAD_NEW_GIT_DIFF, requestNewGitDiff);
}

function* requestNewGitDiff(action: BaseAction) {
  console.log(action);

  const hashes = yield getCommitHashes();

  let previous = hashes.previousHash;

  if (action.payload) {
    previous = action.payload;
  }

  const currentDifferences = yield getCommitFileDifferences(
    hashes.targetHash,
    previous
  );
  yield put(getGitDiffCompletedAction(currentDifferences));
}
