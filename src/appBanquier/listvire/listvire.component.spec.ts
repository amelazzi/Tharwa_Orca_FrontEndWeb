import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvireComponent } from './listvire.component';

describe('ListvirexterneComponent', () => {
  let component: ListvireComponent;
  let fixture: ComponentFixture<ListvireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
