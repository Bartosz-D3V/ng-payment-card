import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { CreditCardModule } from '@cc-project/lib/credit-card.module';
import { CreditCardModule } from 'credit-card';

/**
 * @Ignore
 * Wrapper module used purely for development and presentation purposes.
 * Not included in the production package, excluded from NPM module.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CreditCardModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
