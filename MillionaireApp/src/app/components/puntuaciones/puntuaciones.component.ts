import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-puntuaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './puntuaciones.component.html',
  styleUrl: './puntuaciones.component.css'
})
export class PuntuacionesComponent {
  levels: number[] = Array(15).fill(0).map((_, i) => i + 1);
  currentScore: number = 0;
  
}

