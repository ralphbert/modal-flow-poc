import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {ModalFlowStepInterface} from '../interfaces/modal-flow-step.interface';
import {TitleDirective} from './title.directive';

@Directive({
    selector: '[appStep]'
})
export class StepDirective {
    component: ModalFlowStepInterface;
    titleDirective?: TitleDirective;

    constructor(public templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
        console.log(this.viewContainerRef);
    }

    setStepInterface(component: ModalFlowStepInterface): void {
        setTimeout(() => {
            this.component = component;
        });
    }
}
