import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmDialogData {
  message: string;
  acceptLabel?: string;
  declineLabel?: string;
}

const defaultData: ConfirmDialogData = {
  acceptLabel: 'Yes',
  declineLabel: 'Nope',
  message: null,
};

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  data: ConfirmDialogData = { ...defaultData };

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) private passedData: ConfirmDialogData,
  ) {
    this.data = {
      ...defaultData,
      ...passedData,
    };
  }
}
