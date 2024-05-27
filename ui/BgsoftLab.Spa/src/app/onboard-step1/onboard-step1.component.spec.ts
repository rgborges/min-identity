import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardStep1Component } from './onboard-step1.component';

describe('OnboardStep1Component', () => {
  let component: OnboardStep1Component;
  let fixture: ComponentFixture<OnboardStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardStep1Component]
    });
    fixture = TestBed.createComponent(OnboardStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
