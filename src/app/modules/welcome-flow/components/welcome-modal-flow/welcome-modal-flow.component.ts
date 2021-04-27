import { Component, OnInit } from '@angular/core';
import {WelcomeFlowService} from '../../services/welcome-flow.service';

@Component({
  selector: 'app-welcome-modal-flow',
  templateUrl: './welcome-modal-flow.component.html',
  styleUrls: ['./welcome-modal-flow.component.scss'],
})
export class WelcomeModalFlowComponent implements OnInit {

  constructor(public welcomeFlowService: WelcomeFlowService) { }

  ngOnInit(): void {
  }

}
