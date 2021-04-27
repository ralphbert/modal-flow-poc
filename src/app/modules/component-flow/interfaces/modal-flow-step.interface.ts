import {Observable} from 'rxjs';

export interface ModalFlowStepInterface {
  disableNext: () => boolean;
  disableGoBack: () => boolean;
  canGoNext: () => Observable<boolean> | boolean;
  canGoBack?: () => Observable<boolean> | boolean;
}
