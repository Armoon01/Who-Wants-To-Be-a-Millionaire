import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPremiosComponent } from './components/menu-premios/menu-premios.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { ComodinesComponent } from './components/comodines/comodines.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPremiosComponent,
    PreguntasComponent,
    RespuestasComponent,
    ComodinesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
