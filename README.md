# Responsive, Angular payment card component

Customizable component with zero external dependencies.

<p align="center">

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/npm/v/ng-payment-card.svg)](https://www.npmjs.com/package/ng-payment-card)
[![Build Status](https://travis-ci.com/Bartosz-D3V/ng-payment-card.svg?branch=master)](https://travis-ci.com/Bartosz-D3V/ng-payment-card)
[![Build status](https://ci.appveyor.com/api/projects/status/ivxohrhd06i2yvco/branch/master?svg=true)](https://ci.appveyor.com/project/Bartosz-D3V/ng-payment-card/branch/master)
[![codecov](https://codecov.io/gh/Bartosz-D3V/ng-payment-card/branch/master/graph/badge.svg)](https://codecov.io/gh/Bartosz-D3V/ng-payment-card)
[![David](https://david-dm.org/bartosz-d3v/ng-payment-card.svg)](https://david-dm.org/bartosz-d3v/ng-credit-card)
[![David](https://david-dm.org/bartosz-d3v/ng-payment-card/dev-status.svg)](https://david-dm.org/bartosz-d3v/ng-credit-card?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

</p>

<p align="center">

<img src="docs/demo.gif" width="607" height="574"/>

</p>

## Install

```bash
yarn add ng-payment-card //or
npm install --save ng-payment-card
```

_Version 0.0.8 is no longer compatible with Angular 2 - 4 due to TypeScript upgrade_

_For Angular 2 - 4, please use version 0.0.7_

## Features

- Neat design
- Validation of all fields (including Luhn validation) - that can be switched off
- Displaying appropriate card provider's name based on card number
- Fully responsive
- No dependencies (apart from Angular itself)
- Angular 2 - 7 compatible
- Built with BEM methodology and SCSS
- Fully customizable
- 100% test coverage level
- Built with statical code analysis tools

## Usage

After installing the component as a dependency, import it into you Angular module.

```js
import { NgPaymentCardModule } from 'ng-payment-card';
```

Afterwards, you can use the component within your templates.

```html
<ng-payment-card></ng-payment-card>

// Setting custom validation messages
<ng-payment-card
  [ccNumMissingTxt]='Please provide card number'
  [cardExpiredTxt]='Payment card has expired'>
</ng-payment-card>

// Handling event emitter
<ng-payment-card
  (formSaved)="processPayment(cc)">
</ng-payment-card>
```

Upon submitting the form, component will emit object in the following format:

```ts
cardNumber: string;
cardHolder: string;
expirationMonth: string;
expirationYear: string;
ccv: number;
```

<a href="https://bartosz-d3v.github.io/ng-payment-card/components/PaymentCardComponent.html#inputs">Full list of available inputs</a>

## Supported card types

- American Express
- Diners
- Diners Carte Blanche
- Discover Club
- China UnionPay
- JCB
- Laser
- MAESTRO
- Mastercard
- Visa Electron
- Visa

## Development

### Installation

```bash
yarn // or
npm install
```

### Running

```bash
yarn start // or
npm start
```

### Testing

```bash
npm test
```

## License

MIT
