import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, map, of, tap, withLatestFrom, catchError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { startAuth, setCurrentPage, setPageAfterAuth, navigate, login, setUser, setSignInError } from './actions';

const pagePermissions = {
  '/all-users': ['admin'],
  '/home': 'all',
  '/': 'all'
};

const startEpic = () => of(startAuth());

const navigateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(navigate.type),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]) => {
      const pageToNavigate = (() => {
        if (pagePermissions[payload] === 'all') {
          return payload;
        } else if (pagePermissions[payload].includes(state.auth.user.role)) {
          return payload;
        }

        return '/home'
      })();
      return [setCurrentPage(pageToNavigate)];
    })
  )
}

const startAuthEpic = (action$, state$) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  return action$.pipe(
    ofType(startAuth.type),
    mergeMap(() => {
      const currentPage = window.location.pathname.split('ums')[1] || '/';
      const actionsToReturn = [];

      actionsToReturn.push(setPageAfterAuth(currentPage === '/' ? '/home' : currentPage));


      if (username && password) {
        actionsToReturn.push(login({username, password}));
      } else {
        actionsToReturn.push(navigate('/'));
      }

      return actionsToReturn;
    })
  );
}

const loginEpic = (action$, state$) => {
  return action$.pipe(
    ofType(login.type),
    mergeMap(({payload}) => {
      const { username, password, rememberCredentials } = payload;

      const urlParams = new URLSearchParams({
        username,
        password,
      }).toString();

      return ajax({
        url: `https://apis.stackprint.io/simple-auth-test/user?${urlParams}`,
        method: 'GET',
        crossDomain: true
      }).pipe(
        map(data => {
          const user = data.response[0];
          if (user) {
            return login.succeeded({ user, rememberCredentials })
          }

          return login.failed('Invalid credentials')
        }),
        catchError(() => of(login.failed('Something went wrong')))
      )
    })
  );
}

const loginSucceededEpic = (action$, state$) => {
  return action$.pipe(
    ofType(login.succeeded.type),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]) => {
      const {
        user,
        rememberCredentials
      } = payload || {};

      if(rememberCredentials) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.password);
      }

      return [
        setUser(user),
        navigate(state.auth.pageAfterAuth),
        setSignInError('')
      ];
    })
  )
}

const loginFailedEpic = (action$, state$) => {
  return action$.pipe(
    ofType(login.failed.type),
    tap(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }),
    map(({payload}) => setSignInError(payload))
  )
}

const authRootEpic = combineEpics(startEpic, startAuthEpic, navigateEpic, loginEpic, loginSucceededEpic, loginFailedEpic);

export { authRootEpic };