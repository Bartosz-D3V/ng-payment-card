# Responsive, Angular credit card component

_Customizable component with zero external dependencies._
<p align="center">


<img src="https://github.com/Bartosz-D3V/ng-credit-card/blob/docs/master/readme/docs/demo.gif" width="407" height="428" />
</p>

## Install
As component is in active development - it has not been published on NPM yet.

## Features
* Neat design
* Validation of all fields (including Luhn validation) - that can be switched off
* Displaying appropriate card provider's name based on card number
* Fully responsive
* No dependencies (apart from Angular itself)
* Angular 2 - 6 compatible
* Built with BEM methodology and SCSS
* Fully customizable
* 100% test coverage level
* Built with statical code analysis tools

## Usage
After installing the component as a dependency, import it into you Angular module.
```js
import { CreditCardModule } from 'credit-card';
```

Afterwards, you can use the component within your templates.
```html
<ng-credit-card></ng-credit-card>
```

## Development
### Installation
```bash
yarn
npm install
```

### Running
```bash
npm start
```

### Testing
```bash
npm test
```

## License
MIT
