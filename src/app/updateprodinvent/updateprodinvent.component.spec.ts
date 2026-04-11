import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprodinventComponent } from './updateprodinvent.component';

describe('UpdateprodinventComponent', () => {
  let component: UpdateprodinventComponent;
  let fixture: ComponentFixture<UpdateprodinventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprodinventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprodinventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
