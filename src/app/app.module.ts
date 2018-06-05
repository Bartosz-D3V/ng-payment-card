import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CreditCardModule } from '@cc-project/lib/credit-card.module';
// import { CreditCardModule } from 'credit-card';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CreditCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
