import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbanquierComponent } from './navbarbanquier.component';

describe('NavbarbanquierComponent', () => {
  let component: NavbarbanquierComponent;
  let fixture: ComponentFixture<NavbarbanquierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarbanquierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarbanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
