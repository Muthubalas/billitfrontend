import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatememComponent } from './updatemem.component';

describe('UpdatememComponent', () => {
  let component: UpdatememComponent;
  let fixture: ComponentFixture<UpdatememComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatememComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatememComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
