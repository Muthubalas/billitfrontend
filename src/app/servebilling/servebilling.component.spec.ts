import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServebillingComponent } from './servebilling.component';

describe('ServebillingComponent', () => {
  let component: ServebillingComponent;
  let fixture: ComponentFixture<ServebillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServebillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServebillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
