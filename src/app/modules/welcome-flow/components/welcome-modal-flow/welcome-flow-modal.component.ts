import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WelcomeFlowStateService} from '../../services/welcome-flow-state.service';
import {FLOW_STATE_SERVICE} from '../../../component-flow/tokens/data-provider.token';

@Component({
  templateUrl: './welcome-flow-modal.component.html',
  styleUrls: ['./welcome-flow-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FLOW_STATE_SERVICE,
      useExisting: WelcomeFlowStateService,
    }
  ]
})
export class WelcomeFlowModalComponent {
  constructor(public welcomeFlowService: WelcomeFlowStateService) {
  }
}
