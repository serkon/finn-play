import { useTranslate } from 'src/common/component/translate/translate.component';

const HomePage = (): JSX.Element => {
  const { t } = useTranslate();

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <button className={'primary'}>{t('content')}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
