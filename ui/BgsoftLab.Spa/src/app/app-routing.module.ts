import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardStep1Component } from './onboard-step1/onboard-step1.component';
import { OnboardComponent } from './onboard/onboard.component';
import { OnboardStep2Component } from './onboard-step2/onboard-step2.component';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/portal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  /*
  { path: 'onb-step1', component: OnboardComponent },
  { path: 'onb-step2', component: OnboardStep1Component },
  { path: 'onb-step3', component: OnboardStep2Component }, */
  { path: 'portal', component: PortalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
