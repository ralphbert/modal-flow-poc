import {Injectable} from '@angular/core';
import {BaseStateService} from '../../component-flow/services/base-state.service';

export interface WelcomeFlowState {
  disclaimer: boolean;
  settings: {
    enablePushes: boolean;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeFlowStateService extends BaseStateService<WelcomeFlowState> {
  constructor() {
    super({
      settings: {
        name: '',
        enablePushes: false,
      },
      disclaimer: false,
    });
  }
}
