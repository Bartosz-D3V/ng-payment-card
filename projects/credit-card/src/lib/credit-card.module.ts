import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';
import { CreditCardNumberPipe } from './pipe/credit-card-number.pipe';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [CreditCardComponent, CreditCardNumberPipe],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
