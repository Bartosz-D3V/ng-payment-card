import { CardType } from './card-type.enum';

const CARD_TYPES: Map<string, RegExp> = new Map();
CARD_TYPES.set(CardType.AMERICAN_EXPRESS, new RegExp('^3[47]'));
CARD_TYPES.set(CardType.DINERS, new RegExp('^36'));
CARD_TYPES.set(CardType.DINERS_CARTE_BLANCHE, new RegExp('^30[0-5]'));
CARD_TYPES.set(
  CardType.DISCOVER_CLUB,
  new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)')
);
CARD_TYPES.set(CardType.CHINA_UNIONPAY, new RegExp('^(62[0-9]{14,17})$'));
CARD_TYPES.set(CardType.JCB, new RegExp('^35(2[89]|[3-8][0-9])'));
CARD_TYPES.set(CardType.LASER, new RegExp('^(6304|6706|6709|6771)[0-9]{12,15}$'));
CARD_TYPES.set(CardType.MAESTRO, new RegExp('^(50|5[6-8]|6)[0-9]{12,19}$'));
CARD_TYPES.set(
  CardType.MASTERCARD,
  new RegExp('^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$')
);
CARD_TYPES.set(CardType.VISA_ELECTRON, new RegExp('^(4026|417500|4508|4844|491([37]))'));
CARD_TYPES.set(CardType.VISA, new RegExp('^4'));

export default CARD_TYPES;
export type CardTypesContainer = typeof CARD_TYPES;
