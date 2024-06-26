import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpcionRespuestaService } from '../../services/opcion-respuesta.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-opciones-respuesta',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './opciones-respuesta.component.html',
  styleUrls: ['./opciones-respuesta.component.css']
})
export class OpcionesRespuestaComponent implements OnInit {
  @Input()
  preguntaId!: number;
  opciones: { texto: string, esCorrecta: boolean }[] = [];

  constructor(private opcionRespuestaService: OpcionRespuestaService) {}

  ngOnInit() {
    this.cargarRespuestas(this.preguntaId);
  }

  cargarRespuestas(preguntaId: number) {
    this.opcionRespuestaService.obtenerPorPregunta(preguntaId).subscribe({
      next: (respuestas) => {
        let respuestasSeleccionadas = this.seleccionarRespuestasAleatorias(respuestas, 4);
        this.opciones = this.ordenarAleatoriamente(respuestasSeleccionadas);
      },
      error: (error) => console.error(error)
    });
  }

  seleccionarRespuestasAleatorias(respuestas: any[], cantidad: number): any[] {
    // Filtra las respuestas que son correctas
    const respuestasCorrectas = respuestas.filter(respuesta => respuesta.esCorrecta);

    // Selecciona una respuesta correcta al azar
    const respuestaCorrecta = respuestasCorrectas[Math.floor(Math.random() * respuestasCorrectas.length)];

    // Filtra las respuestas que no son correctas
    const respuestasIncorrectas = respuestas.filter(respuesta => !respuesta.esCorrecta);

    // Selecciona respuestas incorrectas al azar
    const respuestasSeleccionadas = [];
    for (let i = 0; i < cantidad - 1; i++) {
      const respuestaIncorrecta = respuestasIncorrectas[Math.floor(Math.random() * respuestasIncorrectas.length)];
      respuestasSeleccionadas.push(respuestaIncorrecta);
    }

    // Agrega la respuesta correcta a las respuestas seleccionadas
    respuestasSeleccionadas.push(respuestaCorrecta);

    return respuestasSeleccionadas;
  }

  ordenarAleatoriamente(respuestas: any[]): any[] {
    return respuestas.sort(() => Math.random() - 0.5);
  }
}
