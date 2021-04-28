import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentFlowComponent} from './components/component-flow/component-flow.component';
import {StepDirective} from './directives/step.directive';
import {TitleDirective} from './directives/title.directive';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [
    ComponentFlowComponent,
    StepDirective,
    TitleDirective,
  ],
  exports: [
    ComponentFlowComponent,
    StepDirective,
    TitleDirective,
  ],
  imports: [
    CommonModule,
    UiModule,
  ]
})
export class ComponentFlowModule {
}
