import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AladexpenseComponent } from './aladexpense.component';

describe('AladexpenseComponent', () => {
  let component: AladexpenseComponent;
  let fixture: ComponentFixture<AladexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AladexpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AladexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
