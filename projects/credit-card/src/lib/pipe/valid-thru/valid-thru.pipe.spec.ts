import { ValidThruPipe } from './valid-thru.pipe';

describe('ValidThruPipe', () => {
  let pipe: ValidThruPipe;

  beforeAll(() => {
    pipe = new ValidThruPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return slash (/) if length is different than 7', () => {
    expect(pipe.transform('12/22')).toEqual('/');
    expect(pipe.transform('7/201')).toEqual('/');
    expect(pipe.transform('07/201')).toEqual('/');
    expect(pipe.transform('/2020')).toEqual('/');
    expect(pipe.transform('1/2020')).toEqual('/');
    expect(pipe.transform('11/21000')).toEqual('/');
    expect(pipe.transform('')).toEqual('/');
    expect(pipe.transform(null)).toEqual('/');
    expect(pipe.transform(undefined)).toEqual('/');
  });

  it('should format date if length is equal to 7', () => {
    expect(pipe.transform('07/2020')).toEqual('07/20');
    expect(pipe.transform('11/2020')).toEqual('11/20');
    expect(pipe.transform('15/2010')).toEqual('15/10');
  });
});
