import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedBackComponent } from './all-feed-back.component';

describe('AllFeedBackComponent', () => {
  let component: AllFeedBackComponent;
  let fixture: ComponentFixture<AllFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFeedBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
