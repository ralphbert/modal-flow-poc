import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {BuyFlowState} from '../../services/buy-flow-state.service';

@Component({
  selector: 'app-buy-amount',
  templateUrl: './buy-amount.component.html',
  styleUrls: ['./buy-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyAmountComponent extends BaseStepComponent<BuyFlowState> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  get total(): number {
    const state = this.stateService.getData();
    return state.amount * state.product.rate;
  }

  get symbol(): string {
    const state = this.stateService.getData();
    return state.product.symbol;
  }

  ngOnInit(): void {
    this.stateService.dataChanges$.subscribe(state => {
      console.log('BuyAmountComponent');
      this.flowControlService.disableNext(state.amount <= 0);
    });
  }

  onAmountChange(amount: number): void {
    this.stateService.patchData({
      amount: isNaN(amount) ? 0 : Math.max(amount, 0),
    });
  }
}
