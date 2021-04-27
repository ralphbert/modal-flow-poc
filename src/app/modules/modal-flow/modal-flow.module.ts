import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFlowComponent } from './components/modal-flow/modal-flow.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    ModalFlowComponent
  ],
  exports: [
    ModalFlowComponent,
  ],
})
export class ModalFlowModule { }
