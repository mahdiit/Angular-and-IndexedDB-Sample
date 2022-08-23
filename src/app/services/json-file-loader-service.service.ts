import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonFileLoaderService {
  data: any = {};
  constructor(private http: HttpClient) { }

  errorMsg?: string;

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }

  Load<ConfigInterface>(jsonFilePath: string, defaults?: ConfigInterface): Promise<ConfigInterface> {
    var p = new Promise<ConfigInterface>(resolve => {
      this.http.get(jsonFilePath)
        .pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
          })
        ).subscribe(
          {
            next: (response) => {
              this.data = Object.assign({}, defaults || {}, response || {});
              resolve(this.data);
            },
            error: (err) => { },
            complete: () => { console.log("completed") }
          }
        );
    });
    p.catch((reason)=>{ console.log("rejected" + reason); });
    return p;
  }
}
