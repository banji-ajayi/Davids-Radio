import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../../auth/login/login.component';
import { SharedModule } from '../../shared/shared.module';


const loginRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  }
]);

@NgModule({
  imports: [
    loginRouting,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {}
