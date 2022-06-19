import { useDispatch } from 'react-redux';

import { Slider } from 'src/common/component/slider/slider.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { set_game_columns } from 'src/common/store/reducers/GameReducer';
import './columns.component.scss';

export const Columns = (): JSX.Element => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  dispatch;
  const setColumn = (columns: number) => {
    console.log('columns:', columns);
    dispatch(set_game_columns(columns));
  };

  return (
    <section className="columns-list">
      <h2 className="column-title">{t('Columns')}</h2>
      <Slider count={3} onClick={setColumn} />
    </section>
  );
};
