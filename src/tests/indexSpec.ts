import myFunc from './index'

describe('General test', () => {
  it('expect myFunc(5) to equal 25', () => {
    expect(myFunc(5)).toEqual(25);
  });
  it('expect myFunc(6) to equal 36', () => {
    expect(myFunc(6)).toEqual(36);
  });
});