import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { AboutComponent } from './about.component';


const AboutRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'about',
    component: AboutComponent
  }
]);

@NgModule({
  imports: [
    AboutRouting,
    SharedModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: []
})
export class AboutModule {}
