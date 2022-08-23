import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    let router = this.injector.get(Router);
    //console.log('URL: ' + router.url);
    //console.error(error);

    router.navigate(['/error']);
  }

}
