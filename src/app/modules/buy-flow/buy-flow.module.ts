import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuyOverviewComponent} from './components/buy-overview/buy-overview.component';
import {BuyFlowModalComponent} from './components/buy-flow-modal/buy-flow-modal.component';
import {BuyAmountComponent} from './components/buy-amount/buy-amount.component';
import {BuyCheckoutComponent} from './components/buy-checkout/buy-checkout.component';
import {ComponentFlowModule} from '../component-flow/component-flow.module';
import {FormsModule} from '@angular/forms';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [
    BuyOverviewComponent,
    BuyFlowModalComponent,
    BuyAmountComponent,
    BuyCheckoutComponent
  ],
  imports: [
    CommonModule,
    ComponentFlowModule,
    FormsModule,
    UiModule
  ],
  exports: [
    BuyFlowModalComponent,
  ],
  providers: []
})
export class BuyFlowModule {
}
