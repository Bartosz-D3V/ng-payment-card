import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';
import { CreditCardNumberPipe } from './pipe/credit-card-number/credit-card-number.pipe';
import { ValidThruPipe } from './pipe/valid-thru/valid-thru.pipe';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [CreditCardComponent, CreditCardNumberPipe, ValidThruPipe],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
