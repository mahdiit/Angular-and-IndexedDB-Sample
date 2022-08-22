import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from "./app.material-module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';
import { AppSettingService, Setup_AppConfigService_Factory, Setup_AppSettingsService_Factory } from './services/app-settings';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: Setup_AppConfigService_Factory, deps: [AppConfigService], multi: true },
    { provide: APP_INITIALIZER, useFactory: Setup_AppSettingsService_Factory, deps: [AppSettingService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
