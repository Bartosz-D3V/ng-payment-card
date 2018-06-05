import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      cardNumber: [''],
      cardHolder: [''],
      expirationDay: [''],
      expirationMonth: [''],
      ccv: [''],
    });
  }
}
