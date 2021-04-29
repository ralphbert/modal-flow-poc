import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {BuyFlowState} from '../../services/buy-flow-state.service';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-buy-checkout',
  templateUrl: './buy-checkout.component.html',
  styleUrls: ['./buy-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyCheckoutComponent extends BaseStepComponent<BuyFlowState> implements OnInit {
  loading = false;
  error: Error = null;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.stateService.dataChanges$.subscribe(data => {
      this.flowControlService.disableNext(!data.accept);
    });
  }

  onAccept(accept: boolean): void {
    this.stateService.patchData({
      accept,
    });
  }

  canGoNext(): Observable<boolean> | boolean {
    console.log('canGoNext');
    this.loading = true;
    this.error = null;
    this.flowControlService.disableNext(true);
    this.flowControlService.disableGoBack(true);
    this.changeDetectorRef.markForCheck();

    return of(Math.random() <= 0.5).pipe(
      tap((val) => console.log('canGoNext', val)),
      delay(2000),
      tap((success) => {
        if (!success) {
          this.error = new Error('Oh snap! An error occurred!');
        }
        this.flowControlService.disableNext(false);
        this.flowControlService.disableGoBack(false);
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      }),
    );
  }
}
