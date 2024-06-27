import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OpcionRespuestaService } from '../../services/opcion-respuesta.service';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  preguntaId2!: number;
  @Output() aumentarPuntaje = new EventEmitter<number>();
  @Output() manejarRespuestaCorrecta = new EventEmitter<void>();
  @Output() manejarRespuestaIncorrecta = new EventEmitter<void>();
  opciones: { textoOpcion: string, esCorrecta: boolean, estadoColor: string }[] = [];
  protected animationInterval: any;
  protected seleccionada: any = null; // Variable para rastrear la opción seleccionada
  animated: string = 'animate__backInUp';
  constructor(private opcionRespuestaService: OpcionRespuestaService, private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.preguntaService.preguntaId2$.subscribe(preguntaId2 => {
      if (preguntaId2 != undefined) {
        console.log(preguntaId2);
        this.cargarRespuestas(preguntaId2);
      }
    });
  }

  cargarRespuestas(preguntaId: number) {
    this.opcionRespuestaService.obtenerPorPregunta(preguntaId).subscribe({
      next: (respuestas) => {
        console.log('Respuestas recibidas:', respuestas); // Verificar los datos recibidos
        let respuestasSeleccionadas = this.seleccionarRespuestasAleatorias(respuestas, 4);
        console.log('Respuestas seleccionadas:', respuestasSeleccionadas); // Verificar después de seleccionar
        this.opciones = this.ordenarAleatoriamente(respuestasSeleccionadas).map(opcion => ({ ...opcion, estadoColor: '' }));
        console.log('Opciones finales:', this.opciones); // Verificar el estado final
        this.seleccionada = null; // Reiniciar la selección
        this.clearAnimationInterval(); // Limpiar el intervalo de animación
      },
      error: (error) => console.error(error)
    });
      this.animated = 'animate__backInUp';
  }

  seleccionarRespuestasAleatorias(respuestas: any[], cantidad: number): any[] {
    const respuestasCorrectas = respuestas.filter(respuesta => respuesta.esCorrecta);
    const respuestasIncorrectas = respuestas.filter(respuesta => !respuesta.esCorrecta);

    const respuestasSeleccionadas = new Set();
    while (respuestasSeleccionadas.size < cantidad - 1) {
      const index = Math.floor(Math.random() * respuestasIncorrectas.length);
      respuestasSeleccionadas.add(respuestasIncorrectas[index]);
    }

    if (respuestasCorrectas.length > 0) {
      const indexCorrecta = Math.floor(Math.random() * respuestasCorrectas.length);
      respuestasSeleccionadas.add(respuestasCorrectas[indexCorrecta]);
    }

    return Array.from(respuestasSeleccionadas);
  }

  ordenarAleatoriamente(respuestas: any[]): any[] {
    return respuestas.sort(() => Math.random() - 0.5);
  }

  cambiarColor(opcion: any) {
    if (this.seleccionada === opcion) {
      this.iniciarAnimacion(opcion);
    } else {
      if (this.seleccionada !== null) {
        this.seleccionada.estadoColor = '';
      }
      opcion.estadoColor = 'amarillo';
      this.seleccionada = opcion;
    }
  }

  iniciarAnimacion(opcion: any) {
    let counter = 0;
    this.animationInterval = setInterval(() => {
      opcion.estadoColor = counter % 2 === 0 ? 'rojo' : 'verde';
      counter++;
    }, 200);
    setTimeout(() => {
      clearInterval(this.animationInterval);
      if (!opcion.esCorrecta) {
        setTimeout(() => {
          const opcionCorrecta = this.opciones.find(op => op.esCorrecta);
          if (opcionCorrecta) {
            opcionCorrecta.estadoColor = 'verde';
          }
          this.seleccionada = null;
        }, 1001);
        opcion.estadoColor = 'rojo';
        this.manejarRespuestaIncorrecta.emit(); // Emitir evento para manejar la respuesta incorrecta
      } else {
        this.preguntaService.actualizarPreguntaCorrecta(1);
        this.manejarRespuestaCorrecta.emit(); // Emitir evento para manejar la respuesta correcta
        this.aumentarPuntaje.emit(100); // Emitir evento para aumentar el puntaje

        setTimeout(() => {
          opcion.estadoColor = 'verde';
          this.seleccionada = null;
        }, 2000);
      }
    }, 2000);
    setTimeout(() => {
      this.animated = 'animate__fadeOut';
    }, 3500);
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }
}