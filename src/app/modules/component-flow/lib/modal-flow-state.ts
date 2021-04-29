import {BehaviorSubject, Observable} from 'rxjs';

export interface ModalFlowMeta {
  isFirst: boolean;
  isLast: boolean;
  total: number;
  current: number;
  showNext: boolean;
  disableNext: boolean;
  showGoBack: boolean;
  disableGoBack: boolean;
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
    console.log('%csetData data  ', 'color: gray;', state);
    console.log('%csetData before', 'color: orange;', this.getState());
    this.stateChanged$$.next({...state});
    console.log('%csetData after ', 'color: green;', this.getState());
  }

  getState(): Readonly<T> {
    return {...this.stateChanged$$.getValue()};
  }
}
