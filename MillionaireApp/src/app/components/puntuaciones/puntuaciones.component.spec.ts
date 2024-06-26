import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionesComponent } from './puntuaciones.component';

describe('PuntuacionesComponent', () => {
  let component: PuntuacionesComponent;
  let fixture: ComponentFixture<PuntuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntuacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
