import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { UsuariosComponent } from './components/comodines/usuarios.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { PuntuacionesComponent } from './components/puntuaciones/puntuaciones.component';
import { OpcionesRespuestaComponent } from './components/respuestas/opciones-respuesta.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, UsuariosComponent, 
  PreguntasComponent, PuntuacionesComponent,OpcionesRespuestaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MillionaireApp';
}
