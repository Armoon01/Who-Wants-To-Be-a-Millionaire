import { TestBed } from '@angular/core/testing';

import { OpcionRespuestaService } from './opcion-respuesta.service';

describe('OpcionRespuestaService', () => {
  let service: OpcionRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
