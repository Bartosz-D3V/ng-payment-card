import { PaymentCardNumberPipe } from './payment-card-number.pipe';

describe('PaymentCardNumberPipe', () => {
  const pipe: PaymentCardNumberPipe = new PaymentCardNumberPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original value if the length does not match pre-definition', () => {
    const mockNumber = '1234567891';

    expect(pipe.transform(mockNumber)).toEqual('1234567891');
  });

  it('should return number in XXXX-XXXXXX-XXXXX format for 15 digits long numbers', () => {
    const mockNumber = '123456789123456';

    expect(pipe.transform(mockNumber)).toEqual('1234-567891-23456');
  });

  it('should return number in format: XXXX-XXXX-XXXX-XXXX for 16 digits long numbers', () => {
    const mockNumber = '1234567891234567';

    expect(pipe.transform(mockNumber)).toEqual('1234-5678-9123-4567');
  });
});
