import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListordreComponent } from './listordre.component';

describe('ListordreComponent', () => {
  let component: ListordreComponent;
  let fixture: ComponentFixture<ListordreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListordreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListordreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
