import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validators/card-validator';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from '@cc-project/lib/domain/CardDetails';

@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  public ccForm: FormGroup;

  @Output() public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

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
          CardValidator.checksum,
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

  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;
    this.formSaved.emit(cardDetails);
  }
}
