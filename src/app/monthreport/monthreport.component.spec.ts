import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthreportComponent } from './monthreport.component';

describe('MonthreportComponent', () => {
  let component: MonthreportComponent;
  let fixture: ComponentFixture<MonthreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
