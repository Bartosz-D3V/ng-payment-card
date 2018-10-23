import { Injectable } from '@angular/core';

import { default as CARD_TYPES, CardTypesContainer } from '../domain/card-types';
import { Month } from '../domain/month.enum';

@Injectable()
export class PaymentCardService {
  /**
   * Collection of card types
   */
  private static readonly cardTypes: CardTypesContainer = CARD_TYPES;

  /**
   * Return card type based on card number
   */
  public static getCardType(ccNum: string): string | null {
    for (const [key, val] of Array.from(PaymentCardService.cardTypes.entries())) {
      if (
        ccNum
          .split(new RegExp('[ \\-]'))
          .join('')
          .match(val)
      ) {
        return key;
      }
    }
    return null;
  }

  /**
   * Return months in numerical format
   */
  public static getMonths(): Array<Month> {
    const months: Array<Month> = [];
    for (const key of Object.keys(Month)) {
      months.push(Month[key]);
    }
    return months;
  }

  /**
   * Return years based on current year
   */
  public static getYears(): Array<number> {
    const years: Array<number> = [];
    const year = new Date().getFullYear();
    for (let i = -2; i < 5; i++) {
      years.push(year + i);
    }
    return years;
  }
}
