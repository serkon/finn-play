import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from 'src/common/component/axios/axios.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { RootState } from 'src/common/store/store';
import { Group } from 'src/common/dto/dto';
import { filter_game_by_group } from 'src/common/store/reducers/GameReducer';
import { Filter } from 'src/common/component/filter/Filter';
import { set_groups, set_selected_groups } from 'src/common/store/reducers/GroupReducer';
import './groups.component.scss';

export const Groups = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const filterByTags = (groups: Group[]) => {
    dispatch(filter_game_by_group(groups));
    dispatch(set_selected_groups(groups));
  };
  filterByTags;

  useEffect(() => {
    const groups = async () => {
      const response = await api.get('/groups');
      dispatch(set_groups(response.data.data));
    };
    groups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('groups molecule', store.groups);
  }, [store.groups]);

  return (
    <>
      <section className="groups-list">
        <h2 className="group-title">{t('Groups')}</h2>
        <Filter path="name" placeholder={'Search Groups'} data={store.groups.list} onClick={(groups: Group[]) => filterByTags(groups)} reset={store.games.reset} />
      </section>
    </>
  );
};
