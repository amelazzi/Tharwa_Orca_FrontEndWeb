import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebanquierComponent } from './profilebanquier.component';

describe('ProfilebanquierComponent', () => {
  let component: ProfilebanquierComponent;
  let fixture: ComponentFixture<ProfilebanquierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilebanquierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilebanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
