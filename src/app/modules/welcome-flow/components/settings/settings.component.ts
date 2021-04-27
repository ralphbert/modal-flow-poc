import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {WelcomeFlowService, WelcomeFlowState} from '../../services/welcome-flow.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent extends BaseStepComponent<WelcomeFlowState> {

  constructor(injector: Injector, public welcomeFlowService: WelcomeFlowService) {
    super(injector);
  }

  canGoNext(): Observable<boolean> | boolean {
    return this.stateService.getData().settings.name.length > 0;
  }

  canGoBack(): Observable<boolean> | boolean {
    return true;
  }

  onEnablePushes(checked: boolean): void {
    this.stateService.patchData({
      settings: {
        ...this.stateService.getData().settings,
        enablePushes: checked,
      }
    });
  }

  onNameChange(name: string): void {
    this.stateService.patchData({
      settings: {
        ...this.stateService.getData().settings,
        name,
      }
    });
  }
}
