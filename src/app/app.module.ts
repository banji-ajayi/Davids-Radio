import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HttpModule} from '@angular/http';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './auth/login/login.module';



import {
  SharedModule,
  FooterComponent,
  HeaderComponent,
} from './shared';

import { RouteGuard } from './auth/route-guard';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './shared/notification.service';
import { MyFireService } from './shared/myfire.service';
import { UserService } from './shared/user.service';
import { ScreenService } from './services/screen.service';
import { ScreenBelowLarge } from './directives/screen-below-large.directive';
import { ScreenLarge } from './directives/screen-large.directive';
import { FrameworkConfigService } from './services/framework-config.service';
import { SongmixModule } from './songmix/songmix.module';
import { FileValueAccessor } from '../file-control-value-accessor';
import { FileValidator } from '../file-input.validator';
import { ContactUsModule } from './contact-us/contact-us.module';
import { AboutModule } from './about/about.module';
import { AddAboutModule } from './add-about/add-about.module';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    ScreenBelowLarge,
    ScreenLarge,
    FileValueAccessor,
    FileValidator,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    AdminModule,
    LoginModule,
    rootRouting,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
	  FormsModule,
    ReactiveFormsModule,
    SongmixModule,
    ContactUsModule,
    AboutModule,
    AddAboutModule
  ],
  providers: [RouteGuard, NotificationService, MyFireService, UserService, ScreenService,
   FrameworkConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}
