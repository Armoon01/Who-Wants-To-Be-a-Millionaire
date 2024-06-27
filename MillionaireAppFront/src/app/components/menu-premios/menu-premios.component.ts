import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-premios',
  templateUrl: './menu-premios.component.html',
  styleUrls: ['./menu-premios.component.css']
})
export class MenuPremiosComponent implements OnInit {
  ngOnInit() {
    this.opciones[14] = { numPregunta: 1, estadoColor: 'amarillo' };
    this.manejarRespuestaIncorrecta.subscribe(() => {
      if (this.currentScore == 0) {
        this.opciones[14] = { numPregunta: 1, estadoColor: 'rojo' };
      } else {
        let nivelIndex = Math.floor(this.currentScore / 100);
        let nivelActual = 14 - nivelIndex;
        this.opciones[nivelActual] = { numPregunta: nivelActual, estadoColor: 'rojo' };
        console.log(this.opciones[nivelIndex]);
      }
    });
  }
  
  preguntaEstado: boolean[] = Array(15).fill(false); // Inicializa todos los niveles como no alcanzados
  currentScore: number = 0;
  animated: string = 'animate__backInDown';
  opciones: { numPregunta: number, estadoColor: string }[] = [];
  manejarRespuestaIncorrecta = new EventEmitter<void>();

  aumentarPuntaje(puntos: number) {
    this.currentScore += puntos;

  // Reiniciar la animación
  this.animated = ''; // Primero, quitar la clase para resetear la animación
  setTimeout(() => {
    this.animated = 'animate__shakeX'; // Luego, agregar la clase nuevamente
  }, 10); // Pequeño retraso para asegurar que el navegador detecte el cambio


    // Asume que cada pregunta correcta vale 100 puntos
    // Calcula el índice del nivel basado en el puntaje actual
    let nivelIndex = Math.floor(this.currentScore / 100);
    // Marca todos los niveles alcanzados hasta el nivel actual como completados
    for (let i = 15; i <= nivelIndex; i++) {
      this.preguntaEstado[i] = true;
    }
    let nivelActual = 15 - nivelIndex;
    for (let i = 15; i >= 0; i--) {
      if (nivelActual == i) {
        this.opciones[i] = { numPregunta: i, estadoColor: 'verde' };
        setTimeout(() => {
          this.opciones[i - 1] = { numPregunta: i - 1, estadoColor: 'amarillo' };
        }, 5000);
      }
    }
  }

  getColorEstado(i: number): string {
    return this.opciones[i]?.estadoColor || '';
  }
}