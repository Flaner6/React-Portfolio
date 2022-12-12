import { slice } from './slice';

export const {
  setUser,
  setPage,
  setCurrentPage,
  setPageAfterAuth,
  setSignInError
 } = slice.actions;

 export const startAuth = (payload) => ({
  type: 'auth/startAuth',
  payload
 });
 startAuth.type = 'auth/startAuth';

 export const navigate = (payload) => ({
  type: 'auth/navigate',
  payload
 });
 navigate.type = 'auth/navigate';

 export const login = (payload) => ({
  type: 'auth/login',
  payload
 });

 login.type = 'auth/login';

 login.succeeded = (payload) => ({
  type: 'auth/loginSucceeded',
  payload
 });

 login.succeeded.type = 'auth/loginSucceeded';

 login.failed = (payload) => ({
  type: 'auth/loginFailed',
  payload
 });

 login.failed.type = 'auth/loginFailed';
