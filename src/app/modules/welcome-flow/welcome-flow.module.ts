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
import {WelcomeFlowService} from './services/welcome-flow.service';
import {COMPONENT_FLOW_SERVICE} from '../component-flow/tokens/data-provider.token';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentFlowModule,
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
  providers: [WelcomeFlowService, {
    provide: COMPONENT_FLOW_SERVICE,
    useExisting: WelcomeFlowService,
  }],
})
export class WelcomeFlowModule {
}
