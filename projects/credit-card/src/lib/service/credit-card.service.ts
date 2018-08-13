import { Injectable } from '@angular/core';

import { default as CARD_TYPES, CardTypesContainer } from '@cc-project/lib/domain/card-types';
import { Month } from '@cc-project/lib/domain/month.enum';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private static readonly cardTypes: CardTypesContainer = CARD_TYPES;

  public static getCardType(ccNum: string): string | null {
    for (const [key, val] of Array.from(CreditCardService.cardTypes.entries())) {
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

  public static getMonths(): Array<Month> {
    const months: Array<Month> = [];
    for (const key of Object.keys(Month)) {
      months.push(Month[key]);
    }
    return months;
  }

  public static getYears(): Array<number> {
    const years: Array<number> = [];
    const year = new Date().getFullYear();
    for (let i = -2; i < 5; i++) {
      years.push(year + i);
    }
    return years;
  }
}
