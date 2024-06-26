import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  lifelines: string[] = ['Comodín 1', 'Comodín 2', 'Comodín 3', 'Comodín 4'];
}
