import { NgModule, Inject, Optional, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { PayPalModule } from './paypal';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,

    PayPalModule.init({
      clientId: 'sb', // Using sandbox for testing purposes only
      currency: 'EUR',
      integrationDate: '2021-07-01'
      //merchantId: "abc"
      //commit: true,
      //vault: true,
      //disableFunding: "card"
    })
  ],

  declarations: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
