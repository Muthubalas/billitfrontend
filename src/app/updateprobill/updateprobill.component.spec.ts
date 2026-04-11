import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprobillComponent } from './updateprobill.component';

describe('UpdateprobillComponent', () => {
  let component: UpdateprobillComponent;
  let fixture: ComponentFixture<UpdateprobillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprobillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprobillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
