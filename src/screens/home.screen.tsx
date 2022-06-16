import { useNavigate } from 'react-router-dom';
import { api } from 'src/common/component/axios/axios.component';
import { useTranslate } from 'src/common/component/translate/translate.component';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const admin = async () => {
    try {
      await api.get('/admin');
    } catch (e) {
      console.log('home:', e);
    }
  };

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <h1>Home</h1>
            <button className={'primary'} aria-label="edit" onClick={admin}>
              {t('admin')}
            </button>
            <button onClick={() => navigate('/about')}>About</button>
          </div>
        </div>
      </div>
    </>
  );
};

// http://bakirkure.com/en/office-solutions/what-we-do
