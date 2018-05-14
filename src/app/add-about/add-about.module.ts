import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { AddAboutComponent } from './add-about.component';


const addAboutRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'edit-aboutus',
    component: AddAboutComponent
  }
]);

@NgModule({
  imports: [
    addAboutRouting,
    SharedModule
  ],
  declarations: [
    AddAboutComponent
  ],
  providers: []
})
export class AddAboutModule {}
