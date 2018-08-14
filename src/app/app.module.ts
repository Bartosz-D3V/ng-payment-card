import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgPaymentCardModule } from '@cc-project/lib/ng-payment-card.module';
// import { NgPaymentCardModule } from 'ng-payment-card';

/**
 * @Ignore
 * Wrapper module used purely for development and presentation purposes.
 * Not included in the production package, excluded from NPM module.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgPaymentCardModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
