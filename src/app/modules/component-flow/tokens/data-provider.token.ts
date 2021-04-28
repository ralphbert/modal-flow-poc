import {InjectionToken} from '@angular/core';
import {ComponentFlowService} from '../services/component-flow.service';

export const FLOW_STATE_SERVICE: InjectionToken<ComponentFlowService<any>> = new InjectionToken('FLOW_STATE_SERVICE');
