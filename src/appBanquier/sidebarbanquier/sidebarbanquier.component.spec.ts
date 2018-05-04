import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarbanquierComponent } from './sidebarbanquier.component';

describe('SidebarbanquierComponent', () => {
  let component: SidebarbanquierComponent;
  let fixture: ComponentFixture<SidebarbanquierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarbanquierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarbanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
