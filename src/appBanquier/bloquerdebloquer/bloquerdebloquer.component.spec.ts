import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquerdebloquerComponent } from './bloquerdebloquer.component';

describe('BloquerdebloquerComponent', () => {
  let component: BloquerdebloquerComponent;
  let fixture: ComponentFixture<BloquerdebloquerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloquerdebloquerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquerdebloquerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
