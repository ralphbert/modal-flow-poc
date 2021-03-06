import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {WelcomeFlowStateService} from '../../services/welcome-flow-state.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent extends BaseStepComponent implements OnInit {

  constructor(injector: Injector, public welcomeFlowService: WelcomeFlowStateService) {
    super(injector);
  }

  ngOnInit(): void {
    this.welcomeFlowService.dataChanges$.subscribe(data => {
      this.flowControlService.disableNext(!data.disclaimer);
    });
  }

  canGoNext(): Observable<boolean> | boolean {
    return this.welcomeFlowService.getData().disclaimer;
  }

  canGoBack(): Observable<boolean> | boolean {
    return true;
  }

  setDisclaimer(event: Event): void {
    this.welcomeFlowService.patchData({
      disclaimer: (event.target as HTMLInputElement).checked,
    });
  }
}
