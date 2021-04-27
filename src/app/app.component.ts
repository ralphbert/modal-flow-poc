import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WelcomeFlowService, WelcomeFlowState} from './modules/welcome-flow/services/welcome-flow.service';
import {WelcomeModalFlowComponent} from './modules/welcome-flow/components/welcome-modal-flow/welcome-modal-flow.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: WelcomeFlowState;

  constructor(private dialog: MatDialog, public welcomeFlowService: WelcomeFlowService) {
  }

  startFlow1(): void {
    this.dialog.open(WelcomeModalFlowComponent).afterClosed().subscribe(data => {
      this.data = data;
    });
  }
}
