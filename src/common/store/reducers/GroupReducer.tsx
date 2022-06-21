import { AnyAction, Reducer } from 'redux';
import { Group } from 'src/common/dto/dto';

export enum GROUP_ACTION {
  SET_GROUPS = 'SET_GROUPS',
  SET_SELECTED_GROUPS = 'SET_SELECTED_GROUPS',
}

export interface GroupState {
  list: Group[];
  selected: Group[];
}

const init: GroupState = {
  list: [],
  selected: [],
};

export const GroupReducer: Reducer = (state: GroupState = init, action) => {
  switch (action.type) {
    case GROUP_ACTION.SET_GROUPS: {
      return { ...state, list: action.payload };
    }
    case GROUP_ACTION.SET_SELECTED_GROUPS: {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
};

export const set_groups = (payload: Group[]): AnyAction => ({
  type: GROUP_ACTION.SET_GROUPS,
  payload,
});

export const set_selected_groups = (payload: Group[]): AnyAction => ({
  type: GROUP_ACTION.SET_SELECTED_GROUPS,
  payload,
});
