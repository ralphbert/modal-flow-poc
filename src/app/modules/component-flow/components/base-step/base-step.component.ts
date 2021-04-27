import {Component, Injector, ViewChild} from '@angular/core';
import {StepDirective} from '../../directives/step.directive';
import {ModalFlowStepInterface} from '../../interfaces/modal-flow-step.interface';
import {Observable} from 'rxjs';
import {FlowControlService} from '../../services/flow-control.service';
import {TitleDirective} from '../../directives/title.directive';
import {COMPONENT_FLOW_SERVICE} from '../../tokens/data-provider.token';
import {ComponentFlowService} from '../../services/component-flow.service';

@Component({
  template: '',
})
export abstract class BaseStepComponent<T = any> implements ModalFlowStepInterface {
  @ViewChild(TitleDirective) set titleDirective(titleDirective: TitleDirective) {
    setTimeout(() => {
      this.stepDirective.titleDirective = titleDirective;
    });
  }

  protected stepDirective: StepDirective;
  protected flowControlService: FlowControlService;
  public stateService: ComponentFlowService<T>;

  constructor(private injector: Injector) {
    this.stepDirective = injector.get(StepDirective);
    this.stepDirective.setStepInterface(this);
    this.flowControlService = injector.get(FlowControlService);
    this.stateService = injector.get(COMPONENT_FLOW_SERVICE);
  }

  disableNext(): boolean {
    return false;
  }

  disableGoBack(): boolean {
    return false;
  }

  canGoNext(): Observable<boolean> | boolean {
    return true;
  }

  canGoBack(): Observable<boolean> | boolean {
    return true;
  }
}
