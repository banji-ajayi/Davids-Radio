import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { ContactUsComponent } from './contact-us.component';


const contactUsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'contactus',
    component: ContactUsComponent
  }
]);

@NgModule({
  imports: [
    contactUsRouting,
    SharedModule
  ],
  declarations: [
    ContactUsComponent
  ],
  providers: []
})
export class ContactUsModule {}
