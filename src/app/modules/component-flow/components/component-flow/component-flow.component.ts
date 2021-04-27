import {AfterViewInit, Component, ContentChildren, Inject, OnInit, QueryList, TemplateRef, ViewChild} from '@angular/core';
import {StepDirective} from '../../directives/step.directive';
import {merge, Observable, of, timer} from 'rxjs';
import {FlowControlService} from '../../services/flow-control.service';
import {startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {COMPONENT_FLOW_SERVICE} from '../../tokens/data-provider.token';
import {ComponentFlowService} from '../../services/component-flow.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-component-flow',
  templateUrl: './component-flow.component.html',
  styleUrls: ['./component-flow.component.scss'],
  animations: [
    trigger('shakeit', [
      state('true', style({
        transform: 'scale(1)',
      })),
      state('false', style({
        transform: 'scale(1)',
      })),
      transition('false => true', animate('750ms ease-out', keyframes([
        style({transform: 'translate3d(-1px, 0, 0)', offset: 0.1}),
        style({transform: 'translate3d(2px, 0, 0)', offset: 0.2}),
        style({transform: 'translate3d(-4px, 0, 0)', offset: 0.3}),
        style({transform: 'translate3d(4px, 0, 0)', offset: 0.4}),
        style({transform: 'translate3d(-4px, 0, 0)', offset: 0.5}),
        style({transform: 'translate3d(4px, 0, 0)', offset: 0.6}),
        style({transform: 'translate3d(-4px, 0, 0)', offset: 0.7}),
        style({transform: 'translate3d(2px, 0, 0)', offset: 0.8}),
        style({transform: 'translate3d(-1px, 0, 0)', offset: 0.9}),
      ]))),
    ])],
  providers: [FlowControlService]
})
export class ComponentFlowComponent implements OnInit, AfterViewInit {
  @ContentChildren(StepDirective) steps: QueryList<StepDirective>;
  @ViewChild('closeConfirm') closeConfirm: TemplateRef<any>;
  confirmDialog: MatDialogRef<any>;
  shakeIt = false;

  currentStep: StepDirective;

  constructor(
    public flowControlService: FlowControlService,
    public dialogRef: MatDialogRef<ComponentFlowComponent>,
    public dialog: MatDialog,
    @Inject(COMPONENT_FLOW_SERVICE) private componentFlowService: ComponentFlowService<any>,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.steps.changes.pipe(
        startWith(this.steps),
      ).subscribe(() => {
        console.log('STEPS', this.steps);
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

  private next(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) + 1];
    this.updateServiceAfterStepChange();
  }

  private goBack(): void {
    this.currentStep = this.steps.toArray()[this.steps.toArray().indexOf(this.currentStep) - 1];
    this.updateServiceAfterStepChange();
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
    });
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
    this.dialogRef.close(this.componentFlowService.getData());
  }

  onCancel(): void {
    this.confirmDialog = this.dialog.open(this.closeConfirm, {disableClose: false});
    this.confirmDialog.afterClosed().subscribe(doClose => {
      if (doClose) {
        this.dialogRef.close();
      }
    });
  }

  onConfirmClose(): void {
    this.confirmDialog.close(true);
  }

  onCancelClose(): void {
    this.confirmDialog.close(false);
  }

  private toBooleanObservable(input?: Observable<boolean> | boolean): Observable<boolean> {
    if (input == null || input === true) {
      return of(true);
    } else if (input === false) {
      return of(false);
    }

    return input;
  }
}
