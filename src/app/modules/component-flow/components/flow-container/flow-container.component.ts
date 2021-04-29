import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import {StepDirective} from '../../directives/step.directive';
import {Observable, of, Subject, timer} from 'rxjs';
import {FlowControlService} from '../../services/flow-control.service';
import {startWith, take, takeUntil, tap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FLOW_STATE_SERVICE} from '../../tokens/data-provider.token';
import {BaseStateService} from '../../services/base-state.service';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../ui/components/confirm-dialog/confirm-dialog.component';
import {shakeAnimation} from '../../lib/shake-animation';

@Component({
  selector: 'app-flow-container',
  templateUrl: './flow-container.component.html',
  styleUrls: ['./flow-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: shakeAnimation,
  providers: [FlowControlService]
})
export class FlowContainerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ContentChildren(StepDirective) steps: QueryList<StepDirective>;
  currentStep: StepDirective;
  shakeIt = false;
  destroy$ = new Subject();

  constructor(
    @Inject(FLOW_STATE_SERVICE) private flowStateService: BaseStateService<any>,
    public flowControlService: FlowControlService,
    public dialogRef: MatDialogRef<FlowContainerComponent>,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.flowControlService.onGoNext$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onNext();
    });

    this.flowControlService.onGoBack$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onPrev();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.steps.changes.pipe(
        startWith(this.steps),
        takeUntil(this.destroy$),
        tap(() => {
          console.log('this.steps.changes');
          if (!this.currentStep || this.steps.toArray().find(step => step === this.currentStep) == null) {
            // checking if current step is still in the updated list. if not go back to 1
            this.currentStep = this.steps.toArray()[0];
          }

          if (this.currentStep == null) {
            throw new Error('no step 1 found');
          }

          this.updateServiceAfterStepChange();
        }),
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateServiceAfterStepChange(): void {
    console.log('updateServiceAfterStepChange');
    const steps = this.steps.toArray();
    const index = steps.indexOf(this.currentStep);

    this.flowControlService.patchData({
      isFirst: index === 0,
      isLast: index >= steps.length - 1,
      total: steps.length,
      current: index + 1,
      disableNext: false,
      disableGoBack: false,
      showNext: true,
      showGoBack: index !== 0,
    });

    this.changeDetectorRef.markForCheck();
  }

  onNext(): void {
    if (!this.flowControlService.getData().isLast) {
      this.toBooleanObservable(
        this.currentStep.component?.canGoNext && this.currentStep.component?.canGoNext()
      ).subscribe(result => {
        console.log('onNext');
        if (result) {
          this.next();
        } else {
          this.shakeIt = true;
          timer(1000).subscribe(() => this.shakeIt = false);
        }
      });
    }
  }

  onPrev(): void {
    if (!this.flowControlService.getData().isFirst) {
      this.toBooleanObservable(
        this.currentStep.component?.canGoBack && this.currentStep.component?.canGoBack()
      ).subscribe(result => {
        if (result) {
          this.goBack();
        }
      });
    }
  }

  onDone(): void {
    if (!this.flowControlService.getData().isFirst) {
      this.toBooleanObservable(this.currentStep.component?.canGoNext && this.currentStep.component?.canGoNext())
        .subscribe(result => {
          if (result) {
            this.dialogRef.close(this.flowStateService.getData());
          }
        });
    }
  }

  onCancel(): void {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      disableClose: false,
      data: {message: 'Do you really want to cancel the flow?'}
    }).afterClosed().subscribe(doClose => {
      if (doClose) {
        this.dialogRef.close();
      }
    });
  }

  private next(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) + 1];
    this.updateServiceAfterStepChange();
  }

  private goBack(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) - 1];
    this.updateServiceAfterStepChange();
  }

  private toBooleanObservable(input?: Observable<boolean> | boolean): Observable<boolean> {
    if (input == null || input === true) {
      return of(true);
    } else if (input === false) {
      return of(false);
    }

    return input.pipe(takeUntil(this.destroy$), take(1));
  }
}
