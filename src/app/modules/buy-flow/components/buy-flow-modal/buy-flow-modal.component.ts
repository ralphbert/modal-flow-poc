import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FLOW_STATE_SERVICE} from '../../../component-flow/tokens/data-provider.token';
import {BuyFlowStateService} from '../../services/buy-flow-state.service';

@Component({
  selector: 'app-buy-flow-modal',
  templateUrl: './buy-flow-modal.component.html',
  styleUrls: ['./buy-flow-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: FLOW_STATE_SERVICE,
    useClass: BuyFlowStateService,
  }]
})
export class BuyFlowModalComponent {
}
