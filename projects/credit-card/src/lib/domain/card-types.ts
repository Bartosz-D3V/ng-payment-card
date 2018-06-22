import { CardType } from '@cc-project/lib/domain/card-type';
import { range, stringifyArray } from '@cc-project/lib/shared/helpers';

const cardTypes: Map<CardType, Array<string>> = new Map();
cardTypes.set(CardType.AMERICAN_EXPRESS, ['34', '37']);
cardTypes.set(CardType.CHINA_UNIONPAY, ['62', '88']);
cardTypes.set(CardType.DINERS_CLUBCARTE_BLANCHE, stringifyArray(range(300, 305)));
cardTypes.set(CardType.DINERS_CLUB_INTERNATIONAL, [...stringifyArray(range(300, 305)), '309', '36', '38', '39']);
cardTypes.set(CardType.DINERS_CLUB_US_AND_CANADA, ['38', '39']);
cardTypes.set(CardType.DISCOVER_CLUB, [
  '6011',
  ...stringifyArray(range(622126, 622925)),
  ...stringifyArray(range(644, 649)),
  '65',
]);
cardTypes.set(CardType.JCB, stringifyArray(range(6528, 6589)));
cardTypes.set(CardType.LASER, ['6304', '6706', '6771', '6709']);
cardTypes.set(CardType.MAESTRO, [
  '5018',
  '5020',
  '5038',
  '5612',
  '5893',
  '6304',
  '6759',
  ...stringifyArray(range(6701, 6703)),
  '0604',
  '6390',
]);
cardTypes.set(CardType.DANKORT, ['5019']);
cardTypes.set(CardType.MASTERCARD, stringifyArray(range(50, 55)));
cardTypes.set(CardType.VISA, ['4']);
cardTypes.set(CardType.VISA_ELECTRON, ['4026', '417500', '4405', '4508', '4844', '4913', '4917']);

export const CARD_TYPES = cardTypes;
