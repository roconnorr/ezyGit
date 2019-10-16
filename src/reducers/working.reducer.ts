import { BaseAction, actionIds } from '../actions';

export const setNewWorkingDirectory = (
  state: string = '',
  action: BaseAction
) => {
  switch (action.type) {
    case actionIds.CHANGE_DIRECTORY: {
      return action.payload;
    }
  }

  return state;
};

export default setNewWorkingDirectory;
