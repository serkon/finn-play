import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from 'src/common/component/axios/axios.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { RootState } from 'src/common/store/store';
import { set_providers, set_selected_providers } from 'src/common/store/reducers/ProviderReducer';
import { Provider } from 'src/common/dto/dto';
import './providers.component.scss';
import { filter_game_by_provider } from 'src/common/store/reducers/GameReducer';
import { Filter } from 'src/common/component/filter/Filter';

export const Providers = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const filterByTags = (providers: Provider[]) => {
    dispatch(filter_game_by_provider(providers));
    dispatch(set_selected_providers(providers));
  };
  filterByTags;

  useEffect(() => {
    const providers = async () => {
      const response = await api.get('/providers');
      dispatch(set_providers(response.data.data));
    };
    providers();
  }, []);

  useEffect(() => {
    console.log('provider molecule', store.providers);
  }, [store.providers]);

  return (
    <>
      <section className="provider-list">
        <h2 className="provider-title">{t('Providers')}</h2>
        <Filter path="name" placeholder={'Search tag'} data={store.providers.list} onClick={(providers: Provider[]) => filterByTags(providers)} />
      </section>
    </>
  );
};
