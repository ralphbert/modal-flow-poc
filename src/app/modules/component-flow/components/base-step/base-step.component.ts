import {ChangeDetectorRef, Component, Injector, ViewChild} from '@angular/core';
import {StepDirective} from '../../directives/step.directive';
import {ModalFlowStepInterface} from '../../interfaces/modal-flow-step.interface';
import {Observable} from 'rxjs';
import {FlowControlService} from '../../services/flow-control.service';
import {TitleDirective} from '../../directives/title.directive';
import {FLOW_STATE_SERVICE} from '../../tokens/data-provider.token';
import {BaseStateService} from '../../services/base-state.service';

@Component({
  template: '',
})
export abstract class BaseStepComponent<T = any> implements ModalFlowStepInterface {
  protected stepDirective: StepDirective;
  protected flowControlService: FlowControlService;
  public stateService: BaseStateService<T>;
  public changeDetectorRef: ChangeDetectorRef;

  @ViewChild(TitleDirective) set titleDirective(titleDirective: TitleDirective) {
    setTimeout(() => {
      this.stepDirective.titleDirective = titleDirective;
      this.changeDetectorRef.markForCheck();
    });
  }

  constructor(private injector: Injector) {
    this.stepDirective = injector.get(StepDirective);
    this.stepDirective.setStepInterface(this);
    this.flowControlService = injector.get(FlowControlService);
    this.stateService = injector.get(FLOW_STATE_SERVICE);
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
  }

  canGoNext(): Observable<boolean> | boolean {
    return true;
  }

  canGoBack(): Observable<boolean> | boolean {
    return true;
  }
}
