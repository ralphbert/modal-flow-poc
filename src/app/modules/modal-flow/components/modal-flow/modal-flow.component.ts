import {ChangeDetectionStrategy, Component, Inject, InjectionToken, OnInit, Optional, Type} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalFlowOrchestratorInterface} from '../../interfaces/modal-flow-orchestrator.interface';
import {WelcomeFlowState} from '../../../welcome-flow/services/welcome-flow.service';

export const MODAL_FLOW_ORCHESTRATOR = new InjectionToken('MODAL_FLOW_ORCHESTRATOR');

@Component({
  selector: 'app-modal-flow',
  templateUrl: './modal-flow.component.html',
  styleUrls: ['./modal-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFlowComponent implements OnInit {
  currentComponent: Type<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    @Optional() @Inject(MODAL_FLOW_ORCHESTRATOR) public modalOrchestrator: ModalFlowOrchestratorInterface<WelcomeFlowState>,
  ) {
    if (!modalOrchestrator) {
      throw new Error('No ModalFlowOrchestratorService defined! Please provide one.');
    }
  }

  ngOnInit(): void {
    this.modalOrchestrator.currentComponent$.subscribe(nextComponent => {
      this.currentComponent = nextComponent;
    });
  }
}
