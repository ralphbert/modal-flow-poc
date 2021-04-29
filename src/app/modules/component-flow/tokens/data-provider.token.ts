import {InjectionToken} from '@angular/core';
import {BaseStateService} from '../services/base-state.service';

export const FLOW_STATE_SERVICE: InjectionToken<BaseStateService<any>> = new InjectionToken('FLOW_STATE_SERVICE');
