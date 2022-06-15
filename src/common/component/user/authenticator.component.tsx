import { AxiosResponse } from 'axios';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HttpResponse, User } from 'src/common/dto/dto';
import { api, LoginResponse, AuthorizationHeader } from 'src/common/component/axios/axios.component';

export class Authenticator {
  static user: User | null = { id: '1337', name: 'John Doe', email: 'qqe', username: 'John.Doe', password: '21313' };

  static isAuthenticated(): boolean {
    return !!Authenticator.user;
  }

  static async signIn({ username, password }: { username: string; password: string }, successCallback?: () => void, errorCallback?: () => void) {
    console.log('authenticator sign', username, password);
    try {
      const login: AxiosResponse<HttpResponse<LoginResponse>> = await api.post('/api/v1/login', {
        data: {
          email: username,
          password,
        },
      });

      window.localStorage.setItem(AuthorizationHeader.AccessToken, (login.data.data as LoginResponse).accessToken);
      window.localStorage.setItem(AuthorizationHeader.RefreshToken, (login.data.data as LoginResponse).refreshToken);
      // Datayı boş gönderirsen header'da gönderdiğin access token ile girdiğin için mevcut kullanıcıyı getirir.
      // const user: AxiosResponse<HttpResponse<User>> = await api.post('/api/v1/user', { data: 'sFlt01rLo65zIpwwHc7teuuQxgBlzhti' });
      const user: AxiosResponse<HttpResponse<User>> = await api.post('/api/v1/user', { data: 'sFlt01rLo65zIpwwHc7teuuQxgBlzhti' });

      console.log('user', user.data.data);
      successCallback && successCallback();
    } catch (e) {
      console.log('debug: Authenticator.signIn error', e);
      window.localStorage.removeItem(AuthorizationHeader.AccessToken);
      window.localStorage.removeItem(AuthorizationHeader.RefreshToken);
      errorCallback && errorCallback();
    }
  }

  static async signOut(id: string, callback?: () => void) {
    console.log('authenticator signOut', id);
    callback && callback();
  }

  static Authorize = ({ children }: React.PropsWithChildren) => {
    const location = useLocation();
    const navigate = useNavigate();

    if (Authenticator.user) {
      return (
        <>
          <p>
            Welcome {Authenticator.user && Authenticator.user.username}!
            <button
              onClick={() => {
                Authenticator.signOut('2sdasd-33sad-23123-daddd', () => navigate('/'));
              }}
            >
              Sign out
            </button>
          </p>
          {children}
        </>
      );
    }

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  };
}
