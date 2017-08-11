import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatAndDrinkComponent } from './eat-and-drink.component';

describe('EatAndDrinkComponent', () => {
  let component: EatAndDrinkComponent;
  let fixture: ComponentFixture<EatAndDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatAndDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatAndDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
