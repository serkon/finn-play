import { AxiosResponse } from 'axios';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HttpResponse, User } from 'src/common/dto/dto';
import { api, LoginResponse, AuthorizationHeader } from 'src/common/component/axios/axios.component';

export class Authenticator {
  // static user: User | null = { id: '1337', name: 'John Doe', email: 'qqe', username: 'John.Doe', password: '21313' };
  static user: User | null = null;
  static tokens: LoginResponse | null = null;

  static isAuthenticated(): boolean {
    return !!Authenticator.user;
  }

  static async signIn({ username, password }: { username: string; password: string }, successCallback?: () => void, errorCallback?: () => void) {
    try {
      const login: AxiosResponse<HttpResponse<LoginResponse>> = await api.post('/login', {
        data: {
          email: username,
          password,
        },
      });
      Authenticator.tokens = login.data.data;
      window.localStorage.setItem(AuthorizationHeader.AccessToken, (login.data.data as LoginResponse).accessToken);
      window.localStorage.setItem(AuthorizationHeader.RefreshToken, (login.data.data as LoginResponse).refreshToken);
      await this.getUser();
      successCallback && successCallback();
    } catch (e) {
      Authenticator.signOut();
      errorCallback && errorCallback();
    }
  }

  static async getUser() {
    // Datayı boş gönderirsen header'da gönderdiğin access token ile girdiğin için mevcut kullanıcıyı getirir.
    // const user: AxiosResponse<HttpResponse<User>> = await api.post('/user', { data: 'sFlt01rLo65zIpwwHc7teuuQxgBlzhti' });
    const user: AxiosResponse<HttpResponse<User>> = await api.post('/user', { data: 'sFlt01rLo65zIpwwHc7teuuQxgBlzhti' });
    Authenticator.user = user.data.data;
    window.localStorage.setItem('user', JSON.stringify(Authenticator.user));
    return user.data.data;
  }

  static async signOut(id?: string, callback?: () => void) {
    console.log('authenticator signOut', id);
    id && (await api.post('/logout', { data: id }));
    Authenticator.user = null;
    Authenticator.tokens = null;
    window.localStorage.removeItem(AuthorizationHeader.AccessToken);
    window.localStorage.removeItem(AuthorizationHeader.RefreshToken);
    window.localStorage.removeItem('user');
    callback && callback();
  }

  static Navigate = ({ children }: React.PropsWithChildren) => {
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
