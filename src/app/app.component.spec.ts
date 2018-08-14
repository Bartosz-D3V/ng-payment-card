import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgCreditCardModule } from '@cc-project/lib/ng-credit-card.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgCreditCardModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
