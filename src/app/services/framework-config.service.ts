import { Injectable } from '@angular/core';


export interface FrameworkConfigSettings {
    showStatusBar?: boolean;
    showStatusBarBreakpoint?: number;
}


@Injectable()
export class FrameworkConfigService {

    showStatusBar = true;
    showStatusBarBreakpoint = 0;

    configure(settings: FrameworkConfigSettings): void {
        Object.assign(this, settings);
    }

}
