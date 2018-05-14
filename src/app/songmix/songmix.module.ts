import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SongmixComponent } from './songmix.component';
import { SharedModule } from '../shared/shared.module';
import { RouteGuard } from '../auth/route-guard';


const songmixRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'songmix',
    component: SongmixComponent,
    canActivate: [RouteGuard]
  }
]);

@NgModule({
  imports: [
    songmixRouting,
    SharedModule
  ],
  declarations: [
    SongmixComponent
  ],
  providers: []
})
export class SongmixModule {}
