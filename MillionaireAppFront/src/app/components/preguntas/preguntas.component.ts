import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { Preguntas } from '../../models/preguntas.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent implements OnInit {
  @Output() cambiarPregunta = new EventEmitter<void>(); // Agregar EventEmitter
  preguntaId2: number = 1;
  preguntaId: number = 1;
  comparador: number = this.preguntaId;
  textoPregunta: string = '';
  animated: string = 'animate__backInDown';
  manejarRespuestaCorrecta = new EventEmitter<void>(); // Definir el EventEmitter
  private respuestasCorrectasContador: number = 0;
  private preguntasMostradas: number[] = []; // Arreglo para almacenar los IDs de las preguntas mostradas

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
    this.cambiarPregunta.subscribe(() => {
      this.cargarPregunta(this.preguntaId); // Cargar nueva pregunta cuando se use el comodín
    });
  }

  manejarRespuestaCorrectaHandler() {
    this.respuestasCorrectasContador++;
    if (this.respuestasCorrectasContador % 5 === 0) {
      console.log('Cambiando la dificultad...'); // Mensaje de depuración
      this.preguntaId++; // Cambiar la dificultad después de cada 5 respuestas correctas
    }
    setTimeout(() => {
      this.animated = 'animate__fadeOut';
    }, 1500);
    setTimeout(() => {
      console.log('Cargando nueva pregunta...'); // Mensaje de depuración
      this.cargarPregunta(this.preguntaId); // Cargar nueva pregunta después de 5 segundos
      this.animated = 'animate__backInDown';
    }, 3000);
  }

  cargarPregunta(id: number) {
    this.preguntaService.obtenerPorDif(id).subscribe({
      next: (preguntas: Preguntas[]) => {
        console.log('Preguntas recibidas:', preguntas); // Verificar los datos recibidos
        if (preguntas.length > 0) {
          let preguntaAleatoria;
          let intentos = 0;

          // Buscar una pregunta que no haya sido mostrada antes
          do {
            const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
            preguntaAleatoria = preguntas[indiceAleatorio];
            intentos++;
          } while (this.preguntasMostradas.includes(preguntaAleatoria.preguntaID) && intentos < 10);

          // Si no se encontró una nueva pregunta después de 10 intentos, tomar la primera no mostrada
          if (this.preguntasMostradas.includes(preguntaAleatoria.preguntaID)) {
            preguntaAleatoria = preguntas.find(p => !this.preguntasMostradas.includes(p.preguntaID));
          }
          if (preguntaAleatoria) {
            this.textoPregunta = preguntaAleatoria.textoPregunta;
            this.preguntaService.actualizarPreguntaId2(preguntaAleatoria.preguntaID);
            this.preguntasMostradas.push(preguntaAleatoria.preguntaID); // Agregar ID de la pregunta mostrada
          } else {
            console.error('No se encontraron preguntas nuevas para la dificultad especificada');
          }
        } else {
          console.error('No se encontraron preguntas para la dificultad especificada');
        }
      },
      error: (error) => console.error(error)
    });
  }
}