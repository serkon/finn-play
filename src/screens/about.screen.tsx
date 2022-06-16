import { useTranslate } from 'src/common/component/translate/translate.component';

export const AboutScreen = (): JSX.Element => {
  const { t } = useTranslate();

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <h1>About</h1>
            <button className={'primary'} aria-label="edit">
              {t('content')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
