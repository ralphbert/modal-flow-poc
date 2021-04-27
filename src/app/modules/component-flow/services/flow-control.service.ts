import {Injectable, QueryList} from '@angular/core';
import {ComponentFlowService} from './component-flow.service';
import {ModalFlowMeta} from '../../modal-flow/services/modal-flow-state.service';
import {StepDirective} from '../directives/step.directive';
import {merge, Observable, Subject} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';

@Injectable()
export class FlowControlService extends ComponentFlowService<ModalFlowMeta> {
  stepsChanged$ = new Subject<QueryList<StepDirective>>();
  stepsData$: Observable<QueryList<StepDirective>>;

  constructor() {
    super({
      isFirst: true,
      total: 0,
      isLast: true,
      current: 0,
      errors: null,
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

      this.setData({
        total,
        current,
        isLast: current >= length,
        isFirst: current <= 1,
        errors: null,
      });
    });
  }

  setQueryList(stepsList: QueryList<StepDirective>): void {
    this.stepsChanged$.next(stepsList);
  }


}
