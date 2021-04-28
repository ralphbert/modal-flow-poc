import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  OnDestroy,
  QueryList
} from '@angular/core';
import {StepDirective} from '../../directives/step.directive';
import {Observable, of, Subject, timer} from 'rxjs';
import {FlowControlService} from '../../services/flow-control.service';
import {startWith, takeUntil} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FLOW_STATE_SERVICE} from '../../tokens/data-provider.token';
import {ComponentFlowService} from '../../services/component-flow.service';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../ui/components/confirm-dialog/confirm-dialog.component';
import {shakeAnimation} from '../../lib/shake-animation';

@Component({
  selector: 'app-component-flow',
  templateUrl: './component-flow.component.html',
  styleUrls: ['./component-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: shakeAnimation,
  providers: [FlowControlService]
})
export class ComponentFlowComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(StepDirective) steps: QueryList<StepDirective>;
  currentStep: StepDirective;
  shakeIt = false;
  destroy$ = new Subject();

  constructor(
    @Inject(FLOW_STATE_SERVICE) private flowStateService: ComponentFlowService<any>,
    public flowControlService: FlowControlService,
    public dialogRef: MatDialogRef<ComponentFlowComponent>,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.steps.changes.pipe(
        startWith(this.steps),
        takeUntil(this.destroy$),
      ).subscribe(() => {
        if (!this.currentStep || this.steps.toArray().find(step => step === this.currentStep) == null) {
          // checking if current step is still in the updated list. if not go back to 1
          this.currentStep = this.steps.toArray()[0];
        }

        if (this.currentStep == null) {
          throw new Error('no step 1 found');
        }
        this.updateServiceAfterStepChange();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private next(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) + 1];
    this.updateServiceAfterStepChange();
  }

  private goBack(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) - 1];
    this.updateServiceAfterStepChange();
  }

  updateServiceAfterStepChange(): void {
    const steps = this.steps.toArray();
    const index = steps.indexOf(this.currentStep);

    this.flowControlService.patchData({
      isFirst: index === 0,
      isLast: index >= steps.length - 1,
      total: steps.length,
      current: index + 1,
    });

    this.changeDetectorRef.markForCheck();
  }

  onNext(): void {
    if (!this.flowControlService.getData().isLast) {
      this.toBooleanObservable(
        this.currentStep.component?.canGoNext && this.currentStep.component?.canGoNext()
      ).subscribe(result => {
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
    this.dialogRef.close(this.flowStateService.getData());
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

  private toBooleanObservable(input?: Observable<boolean> | boolean): Observable<boolean> {
    if (input == null || input === true) {
      return of(true).pipe(takeUntil(this.destroy$));
    } else if (input === false) {
      return of(false).pipe(takeUntil(this.destroy$));
    }

    return input;
  }
}
