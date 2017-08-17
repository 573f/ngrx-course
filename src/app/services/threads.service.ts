import { AllUserData } from './../../../shared/to/all-user-data';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ThreadsService {

  constructor(
    private http: Http
  ) { }

  loadUserThreads ( userId: number ): Observable<AllUserData> {
    const headers = new Headers();
    headers.append( 'USERID', userId.toString(10) );

    return this.http.get( '/api/threads' , {headers})
      .map(res => res.json());
  }
}
