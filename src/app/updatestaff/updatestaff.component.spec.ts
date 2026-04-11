import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestaffComponent } from './updatestaff.component';

describe('UpdatestaffComponent', () => {
  let component: UpdatestaffComponent;
  let fixture: ComponentFixture<UpdatestaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatestaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatestaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
