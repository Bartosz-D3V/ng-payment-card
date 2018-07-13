import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';
import { CreditCardNumberPipe } from './pipe/credit-card-number.pipe';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [CreditCardComponent, CreditCardNumberPipe],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
