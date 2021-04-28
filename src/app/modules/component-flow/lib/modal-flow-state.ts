import {BehaviorSubject, Observable} from 'rxjs';

export interface ModalFlowMeta {
  isFirst: boolean;
  isLast: boolean;
  total: number;
  current: number;
}

export interface ModalFlowStateHandler<T> {
  getState(): Readonly<T>;

  setState(state: Readonly<T>): void;
}

export class ModalFlowState<T> implements ModalFlowStateHandler<T> {
  private stateChanged$$: BehaviorSubject<T>;
  stateChanged$: Observable<T>;

  constructor(initialState: T) {
    this.stateChanged$$ = new BehaviorSubject(initialState);
    this.stateChanged$ = this.stateChanged$$.asObservable();
    this.setState(initialState);
  }

  setState(state: Readonly<T>): void {
    console.log('setData data  ', state);
    console.log('setData before', this.getState());
    this.stateChanged$$.next({...state});
    console.log('setData after ', this.getState());
  }

  getState(): Readonly<T> {
    return {...this.stateChanged$$.getValue()};
  }
}
