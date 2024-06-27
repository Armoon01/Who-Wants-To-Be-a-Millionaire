import { Component, ViewChild } from '@angular/core';
import { ComodinesComponent } from './components/comodines/comodines.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MillionaireAppFront';
  @ViewChild(RespuestasComponent) respuestasComponent!: RespuestasComponent;
  @ViewChild(ComodinesComponent) comodinesComponent!: ComodinesComponent;
  @ViewChild(PreguntasComponent) preguntasComponent!: PreguntasComponent;

  ngAfterViewInit() {
    this.comodinesComponent.useFiftyFifty.subscribe(() => this.respuestasComponent.activarFiftyFifty());
    this.comodinesComponent.useSelectOne.subscribe(() => this.respuestasComponent.activarSelectOne());
    this.comodinesComponent.useChangeQuestion.subscribe(() => this.preguntasComponent.cambiarPregunta.emit());
  }
}
