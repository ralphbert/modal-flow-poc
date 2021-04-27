import {Observable} from 'rxjs';
import {Type} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export type ModalFlowComponentType = Type<any>;

export interface ModalFlowOrchestratorInterface<T> {
  currentComponent$: Observable<ModalFlowComponentType>;

  /**
   * starting at 1
   */
  currentPage: number | null;

  /**
   * the total number of pages
   */
  totalPages: number | null;

  isValid(): boolean;

  getErrors(): ValidationErrors | null;

  next(): void;

  prev(): void;

  isFirst(): boolean;

  isLast(): boolean;
}
