import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-premios',
  templateUrl: './menu-premios.component.html',
  styleUrls: ['./menu-premios.component.css']
})
export class MenuPremiosComponent {
  preguntaEstado: boolean[] = Array(15).fill(false); // Inicializa todos los niveles como no alcanzados
  currentScore: number = 0;
  opciones: {numPregunta: number, estadoColor: string }[] = [];
  aumentarPuntaje(puntos: number) {
    this.currentScore += puntos;
    // Asume que cada pregunta correcta vale 100 puntos
    // Calcula el índice del nivel basado en el puntaje actual
    let nivelIndex = Math.floor(this.currentScore / 100);
    // Marca todos los niveles alcanzados hasta el nivel actual como completados
    for (let i = 15; i <= nivelIndex; i++) {
      this.preguntaEstado[i] = true;
    }
    let nivelActual = 15-nivelIndex;
    for (let i = 15; i >= 0; i--) {
      if(nivelActual == i) {
        this.opciones[i] = {numPregunta: i, estadoColor: 'verde'};
      }
    }
  }
  getColorEstado(i: number): string {
    return this.opciones[i]?.estadoColor || '';
  }
}