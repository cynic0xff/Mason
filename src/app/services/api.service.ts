import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../model/profile';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const apiGetUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

   }

   //return a list of profiles
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(apiGetUrl)
    .pipe(
      tap(_ => console.log('Fetch profile')),
      catchError(this.handleError('getProfiles', []))
    );
  }

  //error handler
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO: send to a log server
      console.error(error);

      return of(result as T);
    };
  }

}
