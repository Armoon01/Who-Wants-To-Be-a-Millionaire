import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesRespuestaComponent } from './opciones-respuesta.component';

describe('OpcionesRespuestaComponent', () => {
  let component: OpcionesRespuestaComponent;
  let fixture: ComponentFixture<OpcionesRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
