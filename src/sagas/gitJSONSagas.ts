import { put, takeEvery, call } from 'redux-saga/effects';
import { actionIds, BaseAction } from '../actions';
import { getCommitHashes, getCommitFileDifferences } from '../git/git';
import { getGitJSONCompletedAction } from '../actions/gitJSON.action';
import { getGitJSON } from '../git/git';

export function* watchLoadGitJSON() {
  yield takeEvery(actionIds.LOAD_NEW_GIT_JSON, requestNewGitJSON);
}

function* requestNewGitJSON(action: BaseAction) {
  console.log(action);

  let json = yield getGitJSON();

  yield put(getGitJSONCompletedAction(json));
}
