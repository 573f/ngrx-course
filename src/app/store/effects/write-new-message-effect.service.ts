import {
    SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, SendNewMessageActionPayload,
    ERROR_OCCURRED_ACTION, ErrorOccurredAction
} from './../actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ThreadsService } from './../../services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class WriteNewMessageEffectService {

    constructor (
        private actions$: Actions,
        private threadService: ThreadsService
    ) { }

    @Effect( { dispatch: false } )
    newMessages$: Observable<any> = this.actions$
        .ofType( SEND_NEW_MESSAGE_ACTION )
        .switchMap(( action: SendNewMessageAction ) => this.threadService.saveNewMessage( action.payload ) )
        .catch(() => Observable.of( new ErrorOccurredAction( 'Error Occurred while saving message' ) ) );
}
