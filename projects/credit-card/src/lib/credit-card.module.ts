import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [CreditCardComponent],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
