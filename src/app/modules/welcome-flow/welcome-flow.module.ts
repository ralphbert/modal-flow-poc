import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SettingsComponent} from './components/settings/settings.component';
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {FinishComponent} from './components/finish/finish.component';
import {FormsModule} from '@angular/forms';
import {OptionalStuffComponent} from './components/optional-stuff/optional-stuff.component';
import {ComponentFlowModule} from '../component-flow/component-flow.module';
import {WelcomeFlowModalComponent} from './components/welcome-modal-flow/welcome-flow-modal.component';
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
    WelcomeFlowModalComponent
  ],
  exports: [
    WelcomeComponent,
    SettingsComponent,
    DisclaimerComponent,
    FinishComponent,
    OptionalStuffComponent
  ],
  providers: [],
})
export class WelcomeFlowModule {
}
