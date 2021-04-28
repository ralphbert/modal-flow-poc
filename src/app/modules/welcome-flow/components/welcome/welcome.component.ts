import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {WelcomeFlowStateService} from '../../services/welcome-flow-state.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent extends BaseStepComponent {
  constructor(injector: Injector, public welcomeFlowService: WelcomeFlowStateService) {
    super(injector);
  }

}
