import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WelcomeFlowState} from './modules/welcome-flow/services/welcome-flow-state.service';
import {WelcomeFlowModalComponent} from './modules/welcome-flow/components/welcome-modal-flow/welcome-flow-modal.component';
import {BuyFlowModalComponent} from './modules/buy-flow/components/buy-flow-modal/buy-flow-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  welcomeFlowResult: WelcomeFlowState;
  buyFlowResult: WelcomeFlowState;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  startWelcomeFlow(): void {
    this.dialog.open(WelcomeFlowModalComponent).afterClosed().subscribe(data => {
      this.welcomeFlowResult = data;
      this.changeDetectorRef.markForCheck();
    });
  }

  startBuyFlow(): void {
    this.dialog.open(BuyFlowModalComponent).afterClosed().subscribe(data => {
      this.buyFlowResult = data;
      this.changeDetectorRef.markForCheck();
    });
  }
}
