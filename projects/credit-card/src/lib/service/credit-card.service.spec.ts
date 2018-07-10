import { TestBed } from '@angular/core/testing';

import { CardType } from '@cc-project/lib/domain/card-type';
import { CreditCardService } from '@cc-project/lib/service/credit-card.service';

describe('CreditCardCreditCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditCardService],
    });
  });

  it('should be created', () => {
    expect(CreditCardService).toBeTruthy();
  });

  describe('getCardType', () => {
    it('should detect AMERICAN_EXPRESS', () => {
      expect(CreditCardService.getCardType('377740327049504')).toBe(CardType.AMERICAN_EXPRESS);
      expect(CreditCardService.getCardType('372774294508668')).toBe(CardType.AMERICAN_EXPRESS);
    });

    it('should detect DINERS', () => {
      expect(CreditCardService.getCardType('36678417462141')).toBe(CardType.DINERS);
      expect(CreditCardService.getCardType('36122381051416')).toBe(CardType.DINERS);
    });

    it('should detect DINERS_CARTE_BLANCHE', () => {
      expect(CreditCardService.getCardType('30310723060882')).toBe(CardType.DINERS_CARTE_BLANCHE);
      expect(CreditCardService.getCardType('30105635125710')).toBe(CardType.DINERS_CARTE_BLANCHE);
    });

    it('should detect DISCOVER_CLUB ', () => {
      expect(CreditCardService.getCardType('6011611639813367')).toBe(CardType.DISCOVER_CLUB);
      expect(CreditCardService.getCardType('6011040601455298')).toBe(CardType.DISCOVER_CLUB);
    });

    it('should detect CHINA_UNIONPAY', () => {
      expect(CreditCardService.getCardType('6281620341037549')).toBe(CardType.CHINA_UNIONPAY);
      expect(CreditCardService.getCardType('6237083013714488')).toBe(CardType.CHINA_UNIONPAY);
    });

    it('should detect JCB', () => {
      expect(CreditCardService.getCardType('3569198543021504')).toBe(CardType.JCB);
      expect(CreditCardService.getCardType('3529500239872869')).toBe(CardType.JCB);
    });

    it('should detect LASER', () => {
      expect(CreditCardService.getCardType('6304611158942658')).toBe(CardType.LASER);
    });

    it('should detect MAESTRO', () => {
      expect(CreditCardService.getCardType('5053026275762086')).toBe(CardType.MAESTRO);
      expect(CreditCardService.getCardType('5030644144155643')).toBe(CardType.MAESTRO);
    });

    it('should detect MASTERCARD', () => {
      expect(CreditCardService.getCardType('5585800405742631')).toBe(CardType.MASTERCARD);
      expect(CreditCardService.getCardType('5579644035345946')).toBe(CardType.MASTERCARD);
    });

    it('should detect VISA_ELECTRON', () => {
      expect(CreditCardService.getCardType('4917907514666080')).toBe(CardType.VISA_ELECTRON);
      expect(CreditCardService.getCardType('4913961879483056')).toBe(CardType.VISA_ELECTRON);
    });

    it('should detect VISA', () => {
      expect(CreditCardService.getCardType('4539330631653907')).toBe(CardType.VISA);
      expect(CreditCardService.getCardType('4929975343720')).toBe(CardType.VISA);
    });

    it('should detect card type if number contains spaces', () => {
      expect(CreditCardService.getCardType('4539 3306 3165 3907')).toBe(CardType.VISA);
      expect(CreditCardService.getCardType('5579 6440 3534 5946')).toBe(CardType.MASTERCARD);
    });

    it('should return null if no card type was detected', () => {
      expect(CreditCardService.getCardType('9139330631653907')).toBeNull();
      expect(CreditCardService.getCardType('993219975343720')).toBeNull();
    });
  });
});
