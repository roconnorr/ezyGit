import { EMAIL_CHANGED } from '../actions/commit';

const INITIAL_STATE = {
  email: 'test@redux.com',
};

const profileReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.email };

    default:
      return state;
  }
};

export default profileReducer;
