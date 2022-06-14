import { AnyAction, Reducer } from 'redux';
import { Group, Game, Provider } from 'src/common/dto/dto';

export interface GameState {
  game: Game[];
  filtered: Game[];
  filter: {
    groups: Group[];
    providers: Provider[];
    search: string;
  };
}

export enum GAME_ACTION {
  SET_GAMES = 'SET_GAMES',
  SET_FILTER_GROUPS = 'SET_FILTER_GROUPS',
  SET_FILTER_PROVIDERS = 'SET_FILTER_PROVIDERS',
  SET_FILTER_SEARCH = 'SET_FILTER_SEARCH',
}

const init: GameState = {
  game: [],
  filtered: [],
  filter: {
    groups: [],
    providers: [],
    search: '',
  },
};
const filterAll = (state: GameState): Game[] => {
  let filtered = state.game;

  // Find Groups
  if (state.filter.groups.length > 0) {
    filtered = state.filter.groups.reduce((total: Game[], group: Group) => [...total, ...filtered.filter((item: Game) => group.games.includes(item.id))], []);
  }

  // Find Providers
  if (state.filter.providers.length > 0) {
    filtered = state.filter.providers.reduce((total: Game[], provider: Provider) => [...total, ...filtered.filter((item: Game) => item.provider === provider.id)], []);
  }

  // Find By Search String
  if (state.filter.search) {
    filtered = [...filtered.filter((item: Game) => item.name.toLowerCase().includes(state.filter.search.toLowerCase()))];
  }

  return filtered;
};

export const GameReducer: Reducer = (state: GameState = init, action: AnyAction) => {
  switch (action.type) {
    case GAME_ACTION.SET_GAMES: {
      return { ...state, game: action.payload };
    }
    case GAME_ACTION.SET_FILTER_GROUPS: {
      state.filter.groups = action.payload;
      const filtered = filterAll(state);

      return { ...state, filtered };
    }
    case GAME_ACTION.SET_FILTER_PROVIDERS: {
      state.filter.providers = action.payload;
      const filtered = filterAll(state);

      return { ...state, filtered };
    }
    case GAME_ACTION.SET_FILTER_SEARCH: {
      state.filter.search = action.payload;
      const filtered = filterAll(state);

      return { ...state, filtered };
    }
    default:
      return state;
  }
};

export const set_games = (payload: Game[]): AnyAction => ({
  type: GAME_ACTION.SET_GAMES,
  payload,
});

export const filter_game_by_group = (payload: Group[]): { type: string; payload: Group[] } => ({
  type: GAME_ACTION.SET_FILTER_GROUPS,
  payload,
});

export const filter_game_by_provider = (payload: Provider[]): { type: string; payload: Provider[] } => ({
  type: GAME_ACTION.SET_FILTER_PROVIDERS,
  payload,
});

export const filter_game_by_search_string = (payload: string): { type: string; payload: string } => ({
  type: GAME_ACTION.SET_FILTER_SEARCH,
  payload,
});