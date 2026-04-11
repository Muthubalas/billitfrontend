import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateservebillComponent } from './updateservebill.component';

describe('UpdateservebillComponent', () => {
  let component: UpdateservebillComponent;
  let fixture: ComponentFixture<UpdateservebillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateservebillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateservebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
