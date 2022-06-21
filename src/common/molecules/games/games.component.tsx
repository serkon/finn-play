import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from 'src/common/component/axios/axios.component';
import { set_games } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';
import './games.component.scss';

export const Games = (): JSX.Element => {
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const [games, setGames] = useState<any[]>([]);
  const [columns, setColumns] = useState<number>(store.games?.columns);

  useEffect(() => {
    const games = async () => {
      const response = await api.get('/games');
      dispatch(set_games(response.data.data));
    };
    games();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGames(store.games?.filtered);
  }, [store.games?.filtered]);

  useEffect(() => {
    setColumns(store.games?.columns);
  }, [store.games?.columns]);

  return (
    <section className="game-list" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {games &&
        games.map((game, key) => (
          <div
            className="game"
            key={key}
            style={{ backgroundImage: `url(${game.cover})`, height: `${store.games?.columns === 2 ? '291px' : store.games?.columns === 3 ? '191px' : '141px'}` }}
          />
        ))}
    </section>
  );
};
