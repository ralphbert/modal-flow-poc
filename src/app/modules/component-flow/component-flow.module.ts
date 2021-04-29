import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlowContainerComponent} from './components/flow-container/flow-container.component';
import {StepDirective} from './directives/step.directive';
import {TitleDirective} from './directives/title.directive';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [
    FlowContainerComponent,
    StepDirective,
    TitleDirective,
  ],
  exports: [
    FlowContainerComponent,
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
