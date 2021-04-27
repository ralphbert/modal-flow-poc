import {ModalFlowComponentType, ModalFlowOrchestratorInterface} from '../interfaces/modal-flow-orchestrator.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalFlowValidatorInterface} from '../interfaces/modal-flow-validator.interface';
import {ValidationErrors} from '@angular/forms';

export abstract class ModalFlowOrchestratorService {
  /*
  private stateManager: ModalFlowStateService<T> = new ModalFlowStateService<T>();
  protected currentComponent$$ = new BehaviorSubject<ModalFlowComponentType>(null);
  currentPage = null;
  totalPages = null;

  get currentComponent$(): Observable<ModalFlowComponentType> {
    return this.currentComponent$$.asObservable();
  }

  getStateManager(): ModalFlowStateService<T> {
    return this.stateManager;
  }

  isValid(): boolean {
    const errors = this.getErrors();
    return errors === null;
  }

  getErrors(): ValidationErrors | null {
    const currentComponent = this.currentComponent$$.getValue();
    const validatorComponent = (currentComponent as unknown as ModalFlowValidatorInterface);

    if (validatorComponent && validatorComponent.validateModal) {
      return validatorComponent.validateModal();
    }

    return null;
  }

  isFirst(): boolean {
    return this.currentPage <= 1;
  }

  isLast(): boolean {
    return this.currentPage >= this.totalPages;
  }

  setCurrentComponent(component: ModalFlowComponentType): void {
    this.currentComponent$$.next(component);
  }

  abstract next(): void;

  abstract prev(): void;

   */
}
