import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithSocialComponent } from './sign-in-with-social.component';

describe('SignInWithSocialComponent', () => {
  let component: SignInWithSocialComponent;
  let fixture: ComponentFixture<SignInWithSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithSocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInWithSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
