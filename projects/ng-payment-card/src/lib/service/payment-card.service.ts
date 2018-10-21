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
  public static getCardType(ccNum: string): number | null {
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
  public static getMonths(): Array<string> {
    const months: Array<string> = [];
    for (const val of Object.values(Month)) {
      if (!isNaN(Number(val))) {
        const month: string = val < 10 ? `0${val}` : val.toString();
        months.push(month);
      }
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
