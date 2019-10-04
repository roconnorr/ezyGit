import { EMAIL_CHANGED } from '../actions/commit';

const initialState = {
  addedIds: [],
  quantityById: {}
}

const getCommitLog = (state = initialState, action: any) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.email };

    default:
      return state;
  }
};

export default getCommitLog;
