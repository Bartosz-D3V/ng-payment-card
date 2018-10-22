import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentCardComponent } from './payment-card.component';
import { PaymentCardService } from './service/payment-card.service';
import { PaymentCardNumberPipe } from './pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from './pipe/valid-thru/valid-thru.pipe';

/**
 * Monolithic module that is being bundled and published.
 * Depends only on ReactiveFormsModule and CommonModule.
 */
@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [PaymentCardComponent, PaymentCardNumberPipe, ValidThruPipe],
  providers: [PaymentCardService],
  exports: [PaymentCardComponent],
})
export class NgPaymentCardModule {}
