import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Sorting, SortingItem } from 'src/common/component/sorting/sorting.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Game } from 'src/common/dto/dto';
import { update_filtered_data } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';
import './sorter.component.scss';

interface SorterProps {
  data: Game[];
}

export const Sorter = (props: SorterProps) => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const onSorting = (sorting: Game[]) => {
    console.log('ss:', sorting);
    dispatch(update_filtered_data(sorting));
  };
  const sortingCases: SortingItem[] = [
    { label: 'A-Z', type: 'name', direction: 'asc' },
    { label: 'Z-A', type: 'name', direction: 'desc' },
    { label: 'Newest', type: 'date', direction: 'asc' },
    { label: 'Oldest', type: 'date', direction: 'desc' },
  ];
  const mutableRefObject = useRef<React.ElementRef<typeof Sorting>>(null);
  const uncheck = () => {
    mutableRefObject.current?.uncheck();
  };

  useEffect(() => {
    uncheck();
  }, [props.data]);

  return (
    <>
      <section className="sorter-list">
        <h2 className="group-title">{t('Groups')}</h2>
        <Sorting onClick={onSorting} data={props.data} cases={sortingCases} ref={mutableRefObject} />
      </section>
    </>
  );
};
