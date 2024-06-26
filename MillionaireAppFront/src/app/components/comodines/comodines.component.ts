import { Component } from '@angular/core';

@Component({
  selector: 'app-comodines',
  templateUrl: './comodines.component.html',
  styleUrl: './comodines.component.css'
})
export class ComodinesComponent {
  lifelines: string[] = ['Comodín 1', 'Comodín 2', 'Comodín 3', 'Comodín 4'];
}
