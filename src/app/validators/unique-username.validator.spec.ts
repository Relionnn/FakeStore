import { UniqueUsername } from './unique-username.validator';

describe('UniqueUsername', () => {
  it('should create an instance', () => {
    expect(new UniqueUsername()).toBeTruthy();
  });
});
