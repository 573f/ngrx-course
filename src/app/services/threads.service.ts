import { Message } from './../../../shared/model/message';
import { commonHttpHeaders } from './commonHttpHeaders';
import { SendNewMessageActionPayload } from './../store/actions';
import { AllUserData } from './../../../shared/to/all-user-data';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ThreadsService {

    constructor (
        private http: Http
    ) { }

    loadUserThreads( userId: number ): Observable<AllUserData> {

        return this.http.get( '/api/threads', commonHttpHeaders( userId ) )
            .map( res => res.json() );
    }

    saveNewMessage( payload: SendNewMessageActionPayload ): Observable<any> {
        return this.http
            .post(
            `/api/threads/${ payload.threadId }`,
            JSON.stringify( { text: payload.text } ),
            commonHttpHeaders( payload.participantId )
            );
    }

    loadNewMessagesForUser( userId: number ): Observable<Message[]> {
        return this.http.post( '/api/notifications/messages', null, commonHttpHeaders( userId ) ).map( res => res.json().payload );
    }

    markMessagesAsRead( currentUserId: number, selectedThreadId: number ): Observable<any> {
        return this.http.patch( `/api/threads/${ selectedThreadId }`, { read: true }, commonHttpHeaders( currentUserId ) );
    }
}
