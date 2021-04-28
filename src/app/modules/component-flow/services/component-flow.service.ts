import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ModalFlowState} from '../lib/modal-flow-state';

@Injectable()
export class ComponentFlowService<T> {
  dataState: ModalFlowState<T>;

  constructor(initialState: T) {
    this.dataState = new ModalFlowState<T>(initialState);
  }

  get dataChanges$(): Observable<T> {
    return this.dataState.stateChanged$;
  }

  setData(data: T): void {
    this.dataState.setState({
      ...data,
    });
  }

  patchData(data: Partial<T>): void {
    this.dataState.setState({
      ...this.dataState.getState(),
      ...data,
    });
  }

  getData(): T {
    return this.dataState.getState();
  }
}
