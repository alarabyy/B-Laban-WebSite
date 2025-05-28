import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFromClientsComponent } from './menu-from-clients.component';

describe('MenuFromClientsComponent', () => {
  let component: MenuFromClientsComponent;
  let fixture: ComponentFixture<MenuFromClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFromClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFromClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
