import { TestBed } from '@angular/core/testing';

import { CardType } from '../domain/card-type.enum';
import { PaymentCardService } from './payment-card.service';

describe('PaymentCardPaymentCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentCardService],
    });
  });

  it('should be created', () => {
    expect(PaymentCardService).toBeTruthy();
  });

  describe('getCardType', () => {
    it('should detect AMERICAN_EXPRESS', () => {
      expect(PaymentCardService.getCardType('377740327049504')).toBe(CardType.AMERICAN_EXPRESS);
      expect(PaymentCardService.getCardType('372774294508668')).toBe(CardType.AMERICAN_EXPRESS);
    });

    it('should detect DINERS', () => {
      expect(PaymentCardService.getCardType('36678417462141')).toBe(CardType.DINERS);
      expect(PaymentCardService.getCardType('36122381051416')).toBe(CardType.DINERS);
    });

    it('should detect DINERS_CARTE_BLANCHE', () => {
      expect(PaymentCardService.getCardType('30310723060882')).toBe(CardType.DINERS_CARTE_BLANCHE);
      expect(PaymentCardService.getCardType('30105635125710')).toBe(CardType.DINERS_CARTE_BLANCHE);
    });

    it('should detect DISCOVER_CLUB ', () => {
      expect(PaymentCardService.getCardType('6011611639813367')).toBe(CardType.DISCOVER_CLUB);
      expect(PaymentCardService.getCardType('6011040601455298')).toBe(CardType.DISCOVER_CLUB);
    });

    it('should detect CHINA_UNIONPAY', () => {
      expect(PaymentCardService.getCardType('6281620341037549')).toBe(CardType.CHINA_UNIONPAY);
      expect(PaymentCardService.getCardType('6237083013714488')).toBe(CardType.CHINA_UNIONPAY);
    });

    it('should detect JCB', () => {
      expect(PaymentCardService.getCardType('3569198543021504')).toBe(CardType.JCB);
      expect(PaymentCardService.getCardType('3529500239872869')).toBe(CardType.JCB);
    });

    it('should detect LASER', () => {
      expect(PaymentCardService.getCardType('6304611158942658')).toBe(CardType.LASER);
    });

    it('should detect MAESTRO', () => {
      expect(PaymentCardService.getCardType('5053026275762086')).toBe(CardType.MAESTRO);
      expect(PaymentCardService.getCardType('5030644144155643')).toBe(CardType.MAESTRO);
    });

    it('should detect MASTERCARD', () => {
      expect(PaymentCardService.getCardType('5585800405742631')).toBe(CardType.MASTERCARD);
      expect(PaymentCardService.getCardType('5579644035345946')).toBe(CardType.MASTERCARD);
    });

    it('should detect VISA_ELECTRON', () => {
      expect(PaymentCardService.getCardType('4917907514666080')).toBe(CardType.VISA_ELECTRON);
      expect(PaymentCardService.getCardType('4913961879483056')).toBe(CardType.VISA_ELECTRON);
    });

    it('should detect VISA', () => {
      expect(PaymentCardService.getCardType('4539330631653907')).toBe(CardType.VISA);
      expect(PaymentCardService.getCardType('4929975343720')).toBe(CardType.VISA);
    });

    it('should detect card type if number contains spaces', () => {
      expect(PaymentCardService.getCardType('4539 3306 3165 3907')).toBe(CardType.VISA);
      expect(PaymentCardService.getCardType('5579 6440 3534 5946')).toBe(CardType.MASTERCARD);
    });

    it('should detect card type if number contains hyphens', () => {
      expect(PaymentCardService.getCardType('4539-3306-3165-3907')).toBe(CardType.VISA);
      expect(PaymentCardService.getCardType('5579-6440-3534-5946')).toBe(CardType.MASTERCARD);
    });

    it('should return null if no card type was detected', () => {
      expect(PaymentCardService.getCardType('9139330631653907')).toBeNull();
      expect(PaymentCardService.getCardType('993219975343720')).toBeNull();
    });
  });

  describe('getMonths', () => {
    it('should return array of months in numeric format', () => {
      expect(PaymentCardService.getMonths().length).toEqual(12);
      expect(PaymentCardService.getMonths()[0]).toEqual('01');
      expect(PaymentCardService.getMonths()[1]).toEqual('02');
      expect(PaymentCardService.getMonths()[2]).toEqual('03');
      expect(PaymentCardService.getMonths()[3]).toEqual('04');
      expect(PaymentCardService.getMonths()[4]).toEqual('05');
      expect(PaymentCardService.getMonths()[5]).toEqual('06');
      expect(PaymentCardService.getMonths()[6]).toEqual('07');
      expect(PaymentCardService.getMonths()[7]).toEqual('08');
      expect(PaymentCardService.getMonths()[8]).toEqual('09');
      expect(PaymentCardService.getMonths()[9]).toEqual('10');
      expect(PaymentCardService.getMonths()[10]).toEqual('11');
      expect(PaymentCardService.getMonths()[11]).toEqual('12');
    });
  });

  describe('getYears', () => {
    it('should return array of years with two in the past and 4 in the future', () => {
      expect(PaymentCardService.getYears().length).toEqual(7);
    });
  });
});
