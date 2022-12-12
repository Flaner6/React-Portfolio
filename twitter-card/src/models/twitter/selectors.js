import { slice } from './slice';

const sliceName = slice.name;

export const ids = (state) => state[sliceName].ids;
export const isFunctionComponentVisible = (state) => state[sliceName].isFunctionComponentVisible;
export const isClassComponentVisible = (state) => state[sliceName].isClassComponentVisible;