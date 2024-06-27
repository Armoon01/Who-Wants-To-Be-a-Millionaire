import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { ComodinesComponent } from './components/comodines/comodines.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(RespuestasComponent) respuestasComponent!: RespuestasComponent;
  @ViewChild(ComodinesComponent) comodinesComponent!: ComodinesComponent;
  @ViewChild(PreguntasComponent) preguntasComponent!: PreguntasComponent;

  ngAfterViewInit() {
    this.comodinesComponent.useFiftyFifty.subscribe(() => this.respuestasComponent.activarFiftyFifty());
    this.comodinesComponent.useSelectOne.subscribe(() => this.respuestasComponent.activarSelectOne());
    this.comodinesComponent.useChangeQuestion.subscribe(() => this.preguntasComponent.cambiarPregunta.emit());
  }
}