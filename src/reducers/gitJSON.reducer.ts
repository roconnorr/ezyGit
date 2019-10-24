import { BaseAction, actionIds } from '../actions';
import gitdata from '../stories/storydata/gitdata.json';

export const getGitJSON = (state: object = gitdata, action: BaseAction) => {
  switch (action.type) {
    case actionIds.LOAD_NEW_GIT_JSON_COMPLETED: {
      return action.payload;
    }
  }

  return state;
};

export default getGitJSON;
