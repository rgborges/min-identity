import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardStep2Component } from './onboard-step2.component';

describe('OnboardStep2Component', () => {
  let component: OnboardStep2Component;
  let fixture: ComponentFixture<OnboardStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardStep2Component]
    });
    fixture = TestBed.createComponent(OnboardStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
