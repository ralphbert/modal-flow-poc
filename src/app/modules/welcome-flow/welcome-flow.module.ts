import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SettingsComponent} from './components/settings/settings.component';
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {FinishComponent} from './components/finish/finish.component';
import {FormsModule} from '@angular/forms';
import { OptionalStuffComponent } from './components/optional-stuff/optional-stuff.component';
import {ComponentFlowModule} from '../component-flow/component-flow.module';
import { WelcomeModalFlowComponent } from './components/welcome-modal-flow/welcome-modal-flow.component';
import {WelcomeFlowStateService} from './services/welcome-flow-state.service';
import {FLOW_STATE_SERVICE} from '../component-flow/tokens/data-provider.token';
import {UiModule} from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentFlowModule,
    UiModule,
  ],
  declarations: [
    WelcomeComponent,
    SettingsComponent,
    DisclaimerComponent,
    FinishComponent,
    OptionalStuffComponent,
    WelcomeModalFlowComponent
  ],
  exports: [
    WelcomeComponent,
    SettingsComponent,
    DisclaimerComponent,
    FinishComponent,
    OptionalStuffComponent
  ],
  providers: [WelcomeFlowStateService, {
    provide: FLOW_STATE_SERVICE,
    useExisting: WelcomeFlowStateService,
  }],
})
export class WelcomeFlowModule {
}
