import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../ui/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-optional-stuff',
  templateUrl: './optional-stuff.component.html',
  styleUrls: ['./optional-stuff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionalStuffComponent extends BaseStepComponent implements OnInit {
  constructor(injector: Injector, private dialog: MatDialog) {
    super(injector);
  }

  ngOnInit(): void {
  }

  canGoNext(): Observable<boolean> | boolean {
    return this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: {
        message: 'Do you really want to continue?',
      }
    }).afterClosed();
  }
}
