import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  data: any = {};

  constructor(private http: HttpClient) {

  }

  Load<ConfigInterface>(configFile: string,defaults?: ConfigInterface): Promise<ConfigInterface> {
    return new Promise<ConfigInterface>(resolve => {
      this.http.get(configFile).subscribe(
        {
          next: (response) => {            
            this.data = Object.assign({}, defaults || {}, response || {});
            resolve(this.data);
          },
          error: (err) => {            
            this.data = Object.assign({}, defaults || {});
            resolve(this.data);
          }
        }
      );
    });
  }
}
