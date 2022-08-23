import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslateService {

  data: any = {};

  constructor(private http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>(resolve => {
      let langPath = `assets/i18n/${lang || 'en'}.json`;
      this.http.get(langPath).subscribe({
        next: (response) => {
          this.data = Object.assign({}, response || {});
          resolve(this.data);
        },
        error: (err) => {
          this.data = {};
          resolve(this.data);
        }
      });
    });
  }
}

export function SetupTranslateFactory(service: TranslateService):
  Function {
  return () => service.use('fa');
}

