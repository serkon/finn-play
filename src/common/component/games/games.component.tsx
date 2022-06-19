import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/common/component/axios/axios.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { set_games } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';
import './games.component.scss';

export const Games = (): JSX.Element => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const [games, setGames] = useState<any[]>([]);
  // const [columns, setColumns] = useState<number>(4);
  navigate;
  t;

  useEffect(() => {
    const games = async () => {
      const response = await api.get('/games');
      dispatch(set_games(response.data.data));
    };
    console.log(store);

    games();
  }, []);

  useEffect(() => {
    console.log('#### page: games.component.tsx', store.games);
    setGames(store.games.filtered);
  }, [store.games]);

  return (
    <div className="game-list" style={{ gridTemplateColumns: `repeat(${store.games.columns}, 1fr)` }}>
      {games && games.map((game, key) => <div className="game" key={key} style={{ backgroundImage: `url(${game.cover})` }} />)}
    </div>
  );
};
