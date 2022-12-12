import { slice } from './slice';

const sliceName = slice.name;

export const users = (state) => state[sliceName].users