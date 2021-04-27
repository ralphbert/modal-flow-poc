import {ValidationErrors} from '@angular/forms';

export interface ModalFlowValidatorInterface {
  validateModal(): ValidationErrors | null;
}
