import { addMore } from '../addMore/addMore';

export function add(a, b) {
  // eslint-disable-next-line eqeqeq
  const _a = a == undefined ? 0 : a;
  // eslint-disable-next-line eqeqeq
  const _b = b == undefined ? 0 : b;

  if (typeof _a !== 'number' || typeof _b !== 'number') {
    return -1;
  }

  const result = (_a || 0) + (_b || 0);

  const finalResult = addMore(result);

  return finalResult;
}