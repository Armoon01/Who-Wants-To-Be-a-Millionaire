import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comodines',
  templateUrl: './comodines.component.html',
  styleUrls: ['./comodines.component.css']
})
export class ComodinesComponent {
  lifelines: { name: string, used: boolean }[] = [
    { name: '50/50', used: false },
    { name: 'Cambiar pregunta', used: false },
    { name: 'Vida extra', used: false },
    { name: 'Seleccionar una', used: false }
  ];

  @Output() useFiftyFifty = new EventEmitter<void>();
  @Output() useSelectOne = new EventEmitter<void>();
  @Output() useChangeQuestion = new EventEmitter<void>();

  activateLifeline(lifeline: string) {
    if (lifeline === '50/50') {
      this.useFiftyFifty.emit();
      this.markLifelineAsUsed('50/50');
    } else if (lifeline === 'Seleccionar una') {
      this.useSelectOne.emit();
      this.markLifelineAsUsed('Seleccionar una');
    } else if (lifeline === 'Cambiar pregunta') {
      this.useChangeQuestion.emit();
      this.markLifelineAsUsed('Cambiar pregunta');
    }
  }

  markLifelineAsUsed(name: string) {
    const lifeline = this.lifelines.find(l => l.name === name);
    if (lifeline) {
      lifeline.used = true;
    }
  }
}