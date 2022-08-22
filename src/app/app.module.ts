import { APP_INITIALIZER, NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from "./app.material-module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';

export function Setup_AppConfigService_Factory(
  service: AppConfigService
): Function {
  return () => service.load();
}

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
    {
      provide: APP_INITIALIZER,
      useFactory: Setup_AppConfigService_Factory,
      deps: [
          AppConfigService
      ],
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
