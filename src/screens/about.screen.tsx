import { useNavigate } from 'react-router-dom';
import { useTranslate } from 'src/common/component/translate/translate.component';

export const AboutScreen = (): JSX.Element => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <h1>About</h1>
            <p>{t('content')}</p>
            <button onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    </>
  );
};
