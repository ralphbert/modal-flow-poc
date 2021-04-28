import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WelcomeFlowStateService} from '../../services/welcome-flow-state.service';

@Component({
  selector: 'app-welcome-modal-flow',
  templateUrl: './welcome-modal-flow.component.html',
  styleUrls: ['./welcome-modal-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeModalFlowComponent implements OnInit {

  constructor(public welcomeFlowService: WelcomeFlowStateService) { }

  ngOnInit(): void {
  }

}
