import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonFileLoaderService {
  data: any = {};
  constructor(private http: HttpClient) { }

  Load<ConfigInterface>(jsonFilePath: string, defaults?: ConfigInterface): Promise<ConfigInterface> {
    return new Promise<ConfigInterface>(resolve => {
      this.http.get(jsonFilePath).subscribe(
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
