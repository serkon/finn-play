import { useTranslate } from 'src/common/component/translate/translate.component';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslate();

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <button className={'primary'} aria-label="edit">
              {t('content')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
