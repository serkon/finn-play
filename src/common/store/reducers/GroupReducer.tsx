import { AnyAction, Reducer } from 'redux';
import { Group } from 'src/common/dto/dto';

export enum GROUP_ACTION {
  SET_GROUPS = 'SET_GROUPS',
}

export const GroupReducer: Reducer = (state: Group[] = [], action) => {
  switch (action.type) {
    case GROUP_ACTION.SET_GROUPS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const set_groups = (payload: Group[]): AnyAction => ({
  type: GROUP_ACTION.SET_GROUPS,
  payload,
});
