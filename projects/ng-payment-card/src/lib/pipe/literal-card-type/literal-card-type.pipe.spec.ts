import { LiteralCardTypePipe } from './literal-card-type.pipe';

describe('LiteralCardTypePipe', () => {
  const pipe: LiteralCardTypePipe = new LiteralCardTypePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return literal card type if found', () => {
    expect(pipe.transform(0)).toEqual('AMERICAN EXPRESS');
    expect(pipe.transform(1)).toEqual('DINERS');
    expect(pipe.transform(2)).toEqual('DINERS CARTE BLANCHE');
    expect(pipe.transform(3)).toEqual('DISCOVER CLUB');
    expect(pipe.transform(4)).toEqual('CHINA UNIONPAY');
    expect(pipe.transform(5)).toEqual('JCB');
    expect(pipe.transform(6)).toEqual('LASER');
    expect(pipe.transform(7)).toEqual('MAESTRO');
    expect(pipe.transform(8)).toEqual('MASTERCARD');
    expect(pipe.transform(9)).toEqual('VISA ELECTRON');
    expect(pipe.transform(10)).toEqual('VISA');
  });

  it('should return null if not card type not found', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
    expect(pipe.transform(-1)).toBeNull();
    expect(pipe.transform(100)).toBeNull();
  });
});
