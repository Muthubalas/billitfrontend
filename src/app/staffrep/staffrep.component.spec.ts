import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffrepComponent } from './staffrep.component';

describe('StaffrepComponent', () => {
  let component: StaffrepComponent;
  let fixture: ComponentFixture<StaffrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffrepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
