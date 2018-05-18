import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';
import * as firebase from 'firebase';
import { FrameworkConfigService, FrameworkConfigSettings } from './services/framework-config.service';
import { PagerService } from './services/pager.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MusicService, PagerService]
})
export class AppComponent implements OnInit {
  constructor (private frameworkConfigService: FrameworkConfigService) {
    const config: FrameworkConfigSettings = {

      showStatusBar: true,
      showStatusBarBreakpoint: 800
    };

    frameworkConfigService.configure(config);

  }




}
