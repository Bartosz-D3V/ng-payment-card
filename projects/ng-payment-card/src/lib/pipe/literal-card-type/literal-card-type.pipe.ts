import { Pipe, PipeTransform } from '@angular/core';
import { CardType } from '../../domain/card-type.enum';

@Pipe({
  name: 'literalCardType',
})
export class LiteralCardTypePipe implements PipeTransform {
  /**
   * Delimiter for enum
   */
  private static readonly CARD_DELIMITER = '_';

  /**
   * Delimiter displayed in literal value
   */
  private static readonly CARD_DELIMITER_DISPLAY = ' ';

  /**
   * Convert enum index into literal value
   */
  public transform(value: number): string | null {
    const cardType: string = CardType[value];
    return cardType
      ? cardType.replace(
          new RegExp(LiteralCardTypePipe.CARD_DELIMITER, 'g'),
          LiteralCardTypePipe.CARD_DELIMITER_DISPLAY
        )
      : null;
  }
}
