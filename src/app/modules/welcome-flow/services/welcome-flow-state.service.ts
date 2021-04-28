import {Injectable} from '@angular/core';
import {ComponentFlowService} from '../../component-flow/services/component-flow.service';

export interface WelcomeFlowState {
  disclaimer: boolean;
  settings: {
    enablePushes: boolean;
    name: string;
  };
}

@Injectable()
export class WelcomeFlowStateService extends ComponentFlowService<WelcomeFlowState> {
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
