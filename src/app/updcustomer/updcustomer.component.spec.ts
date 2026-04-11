import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdcustomerComponent } from './updcustomer.component';

describe('UpdcustomerComponent', () => {
  let component: UpdcustomerComponent;
  let fixture: ComponentFixture<UpdcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdcustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
