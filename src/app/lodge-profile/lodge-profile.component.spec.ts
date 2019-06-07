import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgeProfileComponent } from './lodge-profile.component';

describe('LodgeProfileComponent', () => {
  let component: LodgeProfileComponent;
  let fixture: ComponentFixture<LodgeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
