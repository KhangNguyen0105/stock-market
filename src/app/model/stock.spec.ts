import { Stock } from './stock';

describe('Stock', () => {
  it('should create an instance', () => {
    expect(new Stock('Test Stock', 'TST', 100, 90)).toBeTruthy();
  });
});
