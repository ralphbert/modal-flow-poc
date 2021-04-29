import {Directive, EventEmitter, Output, TemplateRef} from '@angular/core';
import {ModalFlowStepInterface} from '../interfaces/modal-flow-step.interface';
import {TitleDirective} from './title.directive';

@Directive({
  selector: '[appStep]'
})
export class StepDirective {
  component: ModalFlowStepInterface;
  titleDirective?: TitleDirective;
  @Output() afterInit = new EventEmitter();

  constructor(public templateRef: TemplateRef<any>) {
  }

  setStepInterface(component: ModalFlowStepInterface): void {
    setTimeout(() => {
      this.component = component;
      this.afterInit.emit();
      console.log('setStepInterface', component);
    });
  }
}
