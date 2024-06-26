import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComodinesComponent } from './comodines.component';

describe('ComodinesComponent', () => {
  let component: ComodinesComponent;
  let fixture: ComponentFixture<ComodinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComodinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComodinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
