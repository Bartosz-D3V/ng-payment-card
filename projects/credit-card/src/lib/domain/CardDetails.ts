import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';

export class CardDetails implements ICardDetails {
  public cardHolder: string;
  public cardNumber: string;
  public ccv: number;
  public expirationDay: string;
  public expirationMonth: string;

  constructor(cardHolder: string, cardNumber: string, ccv: number, expirationDay: string, expirationMonth: string) {
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expirationDay = expirationDay;
    this.expirationMonth = expirationMonth;
  }
}
