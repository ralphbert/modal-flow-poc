import {InjectionToken} from '@angular/core';
import {ComponentFlowService} from '../services/component-flow.service';

export const COMPONENT_FLOW_SERVICE: InjectionToken<ComponentFlowService<any>> = new InjectionToken('COMPONENT_FLOW_SERVICE');
