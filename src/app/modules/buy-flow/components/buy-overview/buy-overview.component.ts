import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {BuyFlowState, Product} from '../../services/buy-flow-state.service';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-buy-overview',
  templateUrl: './buy-overview.component.html',
  styleUrls: ['./buy-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyOverviewComponent extends BaseStepComponent<BuyFlowState> implements OnInit {
  products: Product[] = [{
    name: 'Power Coin',
    rate: 12.2,
    symbol: 'PC'
  }, {
    name: 'Ultra Coin',
    rate: 0.3,
    symbol: 'UC',
  }, {
    name: 'Pizza Coin',
    rate: 21,
    symbol: '🍕'
  }];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.flowControlService.showNext(false);
  }

  canGoNext(): Observable<boolean> | boolean {
    return this.stateService.dataChanges$
      .pipe(
        map(data => !!data.product),
      );
  }

  onSelect(product: Product): void {
    this.stateService.patchData({
      product,
    });

    this.flowControlService.goNext();
  }
}
