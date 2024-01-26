import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ToastService } from './toast-service';
import { CONFIG } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private actionSource = new Subject<any>();
  currentAction = this.actionSource.asObservable();

  constructor(public toastService: ToastService, private http: HttpClient) {}

  sendAction(message: any) {
    this.actionSource.next(message);
  }

  appendCommonParameters(data: any) {
    if (data == undefined || !data) data = {};

    return data;
  }
  getApi(url: string, params: any) {
    params = this.appendCommonParameters(params);

    return new Promise((resolve, reject) => {
      this.http
        .get(url, { params: params })
        .pipe(
          map((res: any) => res),
          catchError(this.handleError())
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  postApi(url: string, data: any, headers: any) {
    if (!headers || !headers.get('Content-Type')) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    data = this.appendCommonParameters(data);

    return new Promise((resolve, reject) => {
      this.http
        .post(CONFIG.SERVER_URL + url, JSON.stringify(data), {
          headers: headers,
        })
        .pipe(
          map((res: any) => res),
          catchError(this.handleError())
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      let errorMessage = CONFIG.messages.http_error;
      if (error.error && error.error.message) {
        errorMessage = `${error.error.message}`;
      } else if (error.statusText) {
        errorMessage = `${error.statusText}`;
      } else if (error.message) {
        errorMessage = `${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      return throwError(errorMessage);
    };
  }
}
