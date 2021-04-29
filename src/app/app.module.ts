import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomeFlowModule} from './modules/welcome-flow/welcome-flow.module';
import {ComponentFlowModule} from './modules/component-flow/component-flow.module';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {BuyFlowModule} from './modules/buy-flow/buy-flow.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    ComponentFlowModule,
    WelcomeFlowModule,
    BuyFlowModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true,
        hasBackdrop: true,
        width: '600px',
        maxWidth: '100%'
      } as MatDialogConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
