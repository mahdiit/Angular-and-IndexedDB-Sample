import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from "./app.material-module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JdatePipe, FaNumPipe, NgxPersianModule} from 'ngx-persian';

@Pipe({
  name: 'JdatePipe',
  pure: false
})
export class JdatePipeExtend extends JdatePipe {}

@Pipe({
  name: 'FaNumPipe',
  pure: false
})
export class FaNumPipeExtend extends FaNumPipe {}

@NgModule({  
  declarations: [
    AppComponent,
    JdatePipeExtend,
    FaNumPipeExtend
  ],
  imports: [
    BrowserModule,   
    AppMaterialModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    NgxPersianModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
