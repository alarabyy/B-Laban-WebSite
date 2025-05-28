import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForAdminComponent } from './menu-for-admin.component';

describe('MenuForAdminComponent', () => {
  let component: MenuForAdminComponent;
  let fixture: ComponentFixture<MenuForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
