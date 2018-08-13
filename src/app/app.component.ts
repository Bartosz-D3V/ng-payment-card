import { Component } from '@angular/core';

/**
 * @Ignore
 * Wrapper component displaying the actual library.
 * Not included in the production package, excluded from NPM module.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
