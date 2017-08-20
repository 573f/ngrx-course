import { ApplicationState } from '../application-state';
import { Store } from '@ngrx/store';
import { NewMessageReceivedAction } from './../actions';
import { Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Message } from '../../../../shared/model/message';

@Injectable()
export class ServerNotificationsEffectService {

    constructor (
        private threadsService: ThreadsService,
        private store: Store<ApplicationState>
    ) {

    }

    @Effect()
    newMessage$ = Observable.interval( 3000 )
        .withLatestFrom( this.store.select( 'uiState' ) )
        .map(( [ any, uiState ] ) => uiState )
        .filter(( uiState: any ) => uiState.userId )
        .switchMap( uiState => this.threadsService.loadNewMessagesForUser( uiState.userId ) )
        .debug( 'new messages received from server' )
        .withLatestFrom( this.store.select( 'uiState' ) )
        .map(( [ unreadMessages, uiState ] ) => new NewMessageReceivedAction( {
            unreadMessages,
            currentThreadId: uiState.currentThreadId,
            currentUserId: uiState.userId
        } ) );
}
