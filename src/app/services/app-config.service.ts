import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  data: AppConfig = {};

  constructor(private http: HttpClient) {

  }

  load(defaults?: AppConfig): Promise<AppConfig> {
    return new Promise<AppConfig>(resolve => {
      this.http.get('assets/config/config.json').subscribe(
        {
          next: (response) => {
            console.log('using server-side configuration');
            this.data = Object.assign({}, defaults || {}, response || {});
            resolve(this.data);
          },
          error: (err) => {
            console.log('using default configuration');
            console.log(err);
            this.data = Object.assign({}, defaults || {});
            resolve(this.data);
          }
        }
      );
    });
  }
}
