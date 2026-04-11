import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomerserveComponent } from './addcustomerserve.component';

describe('AddcustomerserveComponent', () => {
  let component: AddcustomerserveComponent;
  let fixture: ComponentFixture<AddcustomerserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcustomerserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcustomerserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
