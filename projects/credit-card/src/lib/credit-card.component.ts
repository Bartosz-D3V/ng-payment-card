import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validators/card-validator';

@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  public ccForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.ccForm = this._fb.group({
      cardNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(19),
          CardValidator.numbersOnly,
        ]),
      ],
      cardHolder: ['', Validators.compose([Validators.required])],
      expirationDay: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      expirationMonth: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      ],
      ccv: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(4),
          CardValidator.numbersOnly,
        ]),
      ],
    });
  }
}
