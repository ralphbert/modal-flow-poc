import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentFlowComponent} from './components/component-flow/component-flow.component';
import {StepDirective} from './directives/step.directive';
import {TitleDirective} from './directives/title.directive';

@NgModule({
  declarations: [
    ComponentFlowComponent,
    StepDirective,
    TitleDirective,
  ],
  exports: [
    ComponentFlowComponent,
    StepDirective,
    TitleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentFlowModule {
}
