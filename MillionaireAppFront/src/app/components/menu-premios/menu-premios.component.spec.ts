import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPremiosComponent } from './menu-premios.component';

describe('MenuPremiosComponent', () => {
  let component: MenuPremiosComponent;
  let fixture: ComponentFixture<MenuPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPremiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
