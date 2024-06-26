import { Component, OnInit, Input } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  imports: [HttpClientModule],
  standalone: true,
})
export class PreguntasComponent implements OnInit {
  @Input() preguntaId!: number;
  enunciado: string = '';

  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.cargarPregunta(this.preguntaId);
  }

  cargarPregunta(id: number) {
    this.preguntaService.obtenerPorDif(id).subscribe({
      next: (preguntas) => {
        if (preguntas.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
          const preguntaAleatoria = preguntas[indiceAleatorio];
          this.enunciado = preguntaAleatoria.enunciado;
        } else {
          console.error('No se encontraron preguntas para la dificultad especificada');
        }
      },
      error: (error) => console.error(error)
    });
  }
}