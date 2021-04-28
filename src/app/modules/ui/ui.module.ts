import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingWrapperComponent} from './components/loading-wrapper/loading-wrapper.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingWrapperComponent, LoadingSpinnerComponent, ConfirmDialogComponent],
  exports: [LoadingWrapperComponent, LoadingSpinnerComponent],
})
export class UiModule { }
