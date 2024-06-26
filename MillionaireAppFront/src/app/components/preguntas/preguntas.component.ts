import { Component, OnInit, EventEmitter } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { Preguntas } from '../../models/preguntas.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent implements OnInit {
  preguntaId2: number = 1;
  preguntaId: number = 1;
  comparador: number = this.preguntaId;
  textoPregunta: string = '';
  manejarRespuestaCorrecta = new EventEmitter<void>(); // Definir el EventEmitter
  private respuestasCorrectasContador: number = 0;
  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.preguntaService.preguntaId$.subscribe(preguntaId1 => {
      if (preguntaId1 != undefined) {
        this.preguntaId2 = preguntaId1;
        if (preguntaId1 % 5 === 0) {
          this.preguntaId++; // Cambiar la dificultad
        }
      }
    });
    this.cargarPregunta(this.preguntaId);

    // Suscribirnos al evento
    this.manejarRespuestaCorrecta.subscribe(() => {
      this.manejarRespuestaCorrectaHandler();
    });
  }

  manejarRespuestaCorrectaHandler() {
    this.respuestasCorrectasContador++;
    if (this.respuestasCorrectasContador % 5 === 0) {
      console.log('Cambiando la dificultad...'); // Mensaje de depuración
      this.preguntaId++; // Cambiar la dificultad después de cada 5 respuestas correctas
    }
    setTimeout(() => {
      console.log('Cargando nueva pregunta...'); // Mensaje de depuración
      this.cargarPregunta(this.preguntaId); // Cargar nueva pregunta después de 5 segundos
    }, 5000);
  }

  cargarPregunta(id: number) {
    this.preguntaService.obtenerPorDif(id).subscribe({
      next: (preguntas: Preguntas[]) => {
        console.log('Preguntas recibidas:', preguntas); // Verificar los datos recibidos
        if (preguntas.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
          const preguntaAleatoria = preguntas[indiceAleatorio];
          this.textoPregunta = preguntaAleatoria.textoPregunta;
          console.log(preguntaAleatoria.preguntaID);
          this.preguntaService.actualizarPreguntaId2(preguntaAleatoria.preguntaID);
        } else if (preguntas.length === 1) {
          this.textoPregunta = preguntas[0].textoPregunta;
          this.preguntaService.actualizarPreguntaId2(preguntas[0].preguntaID);
        } else {
          console.error('No se encontraron preguntas para la dificultad especificada');
        }
      },
      error: (error) => console.error(error)
    });
  }
}