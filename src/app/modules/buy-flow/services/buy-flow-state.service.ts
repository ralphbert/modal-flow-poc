import {Injectable} from '@angular/core';
import {BaseStateService} from '../../component-flow/services/base-state.service';

export interface Product {
  name: string;
  rate: number;
  symbol: string;
}

export interface BuyFlowState {
  product: Product | null;
  amount: number;
  accept: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BuyFlowStateService extends BaseStateService<BuyFlowState> {
  constructor() {
    super({
      amount: 0,
      product: null,
      accept: false,
    });
  }
}
