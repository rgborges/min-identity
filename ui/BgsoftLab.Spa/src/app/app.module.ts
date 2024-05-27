import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardComponent } from './onboard/onboard.component';
import { OnboardWizardComponent } from './onboard-wizard/onboard-wizard.component';
import { OnboardStep1Component } from './onboard-step1/onboard-step1.component';
import { OnboardStep2Component } from './onboard-step2/onboard-step2.component';
import { FormsModule } from '@angular/forms';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardComponent,
    OnboardWizardComponent,
    OnboardStep1Component,
    OnboardStep2Component,
    PortalComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
