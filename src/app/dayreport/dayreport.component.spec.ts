import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayreportComponent } from './dayreport.component';

describe('DayreportComponent', () => {
  let component: DayreportComponent;
  let fixture: ComponentFixture<DayreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
