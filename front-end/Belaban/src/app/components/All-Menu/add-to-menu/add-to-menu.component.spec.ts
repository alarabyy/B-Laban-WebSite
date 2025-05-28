import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMenuComponent } from './add-to-menu.component';

describe('AddToMenuComponent', () => {
  let component: AddToMenuComponent;
  let fixture: ComponentFixture<AddToMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
