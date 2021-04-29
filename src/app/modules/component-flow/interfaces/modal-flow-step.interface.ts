import {Observable} from 'rxjs';

export interface ModalFlowStepInterface {
  canGoNext: () => Observable<boolean> | boolean;
  canGoBack?: () => Observable<boolean> | boolean;
}
