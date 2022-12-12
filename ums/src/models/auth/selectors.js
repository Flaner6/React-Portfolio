import { slice } from './slice';

const sliceName = slice.name;

export const user = (state) => state[sliceName].user;
export const page = (state) => state[sliceName].page;
export const currentPage = (state) => state[sliceName].currentPage;
export const signInError = (state) => state[sliceName].signInError;