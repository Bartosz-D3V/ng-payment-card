import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';

/**
 * Monolithic module that is being bundled and published.
 * Depends only on ReactiveFormsModule.
 */
@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [CreditCardComponent],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
