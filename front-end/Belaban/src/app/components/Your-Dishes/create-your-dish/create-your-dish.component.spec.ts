import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateYourDishComponent } from './create-your-dish.component';

describe('CreateYourDishComponent', () => {
  let component: CreateYourDishComponent;
  let fixture: ComponentFixture<CreateYourDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateYourDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateYourDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
