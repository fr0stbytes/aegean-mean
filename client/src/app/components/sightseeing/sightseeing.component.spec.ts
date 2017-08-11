import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightseeningComponent } from './sightseening.component';

describe('SightseeningComponent', () => {
  let component: SightseeningComponent;
  let fixture: ComponentFixture<SightseeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightseeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightseeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
