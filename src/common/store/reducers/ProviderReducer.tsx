import { AnyAction, Reducer } from 'redux';
import { Group, Provider } from 'src/common/dto/dto';

export enum PROVIDER_ACTION {
  SET_PROVIDERS = 'SET_PROVIDERS',
}

export const ProviderReducer: Reducer = (state: Provider[] = [], action) => {
  switch (action.type) {
    case PROVIDER_ACTION.SET_PROVIDERS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const set_providers = (payload: Group[]): AnyAction => ({
  type: PROVIDER_ACTION.SET_PROVIDERS,
  payload,
});
