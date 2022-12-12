import { add } from './add';
import * as addMore from '../addMore/addMore';

describe ('utils/add' , () => {
  const addMoreSpy = jest.spyOn(addMore, 'addMore');



  it('adds two values', () => {
    addMoreSpy.mockImplementation((x) => 10 + x);
    const result = add(1, 2);
    expect(addMoreSpy).toBeCalledTimes(1);
    expect(addMoreSpy).toHaveBeenLastCalledWith(3);
    expect(result).toBe(13)

    addMoreSpy.mockImplementation((x) => 20 + x);
    const result1 = add(2, 2);
    expect(addMoreSpy).toBeCalledTimes(2);
    expect(addMoreSpy).toHaveBeenLastCalledWith(4);
    expect(result1).toBe(24)

    expect(add()).toBe(20);

    expect(add(1)).toBe(21);

    expect(add(undefined, 3)).toBe(23);

    expect(add([], 5)).toBe(-1);
  });
})