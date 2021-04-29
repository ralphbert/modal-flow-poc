import {Injectable, OnDestroy, QueryList} from '@angular/core';
import {BaseStateService} from './base-state.service';
import {StepDirective} from '../directives/step.directive';
import {Observable, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {ModalFlowMeta} from '../lib/modal-flow-state';

@Injectable()
export class FlowControlService extends BaseStateService<ModalFlowMeta> implements OnDestroy {
  private stepsChanged$$ = new Subject<QueryList<StepDirective>>();
  stepsChanged$ = this.stepsChanged$$.asObservable();

  stepsData$: Observable<QueryList<StepDirective>>;

  private onGoNext$$ = new Subject();
  onGoNext$ = this.onGoNext$$.asObservable();

  private onGoBack$$ = new Subject();
  onGoBack$ = this.onGoBack$$.asObservable();

  constructor() {
    super({
      isFirst: true,
      total: 0,
      isLast: true,
      current: 0,
      disableGoBack: false,
      disableNext: false,
      showGoBack: false,
      showNext: false,
    });

    this.stepsChanged$.subscribe();

    this.stepsData$ = this.stepsChanged$.pipe(
      switchMap((list) => {
        return list.changes.pipe(startWith(() => list), map(() => list));
      }),
    );

    this.stepsData$.subscribe(list => {
      const meta = this.getData();
      const total = list.length;
      const current = meta.current < total ? meta.current : 1;
      const isFirst = current <= 1;

      this.setData({
        total,
        current,
        isLast: current >= length,
        isFirst,
        showNext: true,
        showGoBack: !isFirst,
        disableNext: false,
        disableGoBack: false,
      });
    });
  }

  goNext(): void {
    this.onGoNext$$.next();
  }

  goBack(): void {
    this.onGoBack$$.next();
  }

  ngOnDestroy(): void {
    this.onGoBack$$.complete();
    this.onGoNext$$.complete();
    this.stepsChanged$$.complete();
  }

  disableNext(disableNext: boolean): void {
    this.patchData({
      disableNext,
    });
  }

  disableGoBack(disableGoBack: boolean): void {
    this.patchData({
      disableGoBack,
    });
  }

  showNext(showNext: boolean): void {
    this.patchData({
      showNext,
    });
  }

  showGoBack(showGoBack: boolean): void {
    this.patchData({
      showGoBack,
    });
  }
}
