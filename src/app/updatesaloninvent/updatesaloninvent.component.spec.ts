import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesaloninventComponent } from './updatesaloninvent.component';

describe('UpdatesaloninventComponent', () => {
  let component: UpdatesaloninventComponent;
  let fixture: ComponentFixture<UpdatesaloninventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesaloninventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesaloninventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
