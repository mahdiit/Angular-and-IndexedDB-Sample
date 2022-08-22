import { Injectable } from "@angular/core";
import { AppConfig } from "./app-config";
import { AppConfigService } from "./app-config.service";

export interface AppSettings {
    app1: string;
    app2: string;
    app3: string;
}

export function Setup_AppConfigService_Factory(
    service: AppConfigService
  ): Function {
    return () => service.Load<AppConfig>('assets/config/config.json');
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class AppSettingService extends AppConfigService{
  
  }
  
  export function Setup_AppSettingsService_Factory(
    service: AppSettingService
  ): Function {
    return () => service.Load<AppSettings>('assets/config/settings.json');
  }