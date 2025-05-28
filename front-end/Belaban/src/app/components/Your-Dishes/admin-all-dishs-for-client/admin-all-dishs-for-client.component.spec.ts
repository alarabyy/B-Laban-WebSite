import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllDishsForClientComponent } from './admin-all-dishs-for-client.component';

describe('AdminAllDishsForClientComponent', () => {
  let component: AdminAllDishsForClientComponent;
  let fixture: ComponentFixture<AdminAllDishsForClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllDishsForClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllDishsForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
