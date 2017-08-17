import { Injectable }      from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action }          from '@ngrx/store';

import { Observable }      from 'rxjs/Rx';

import { ThreadsService }  from './../../services/threads.service';
import {
  LOAD_USER_THREADS_ACTION,
  LoadUserThreadsAction,
  SELECT_USER_ACTION,
  SelectUserAction,
  UserThreadsLoadedAction
}                          from './../actions';

@Injectable()
export class LoadThreadsEffectService {

  constructor (
    private actions$: Actions,
    private threadsService: ThreadsService
  ) { }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType( LOAD_USER_THREADS_ACTION )
    .debug( 'action received' )
    .switchMap(( action: LoadUserThreadsAction ) => this.threadsService.loadUserThreads( action.payload ) )
    .debug( 'data received via the HTTP request' )
    .map( allUsersData => new UserThreadsLoadedAction( allUsersData ) );

  @Effect() newUserSelected$: Observable<Action> = this.actions$
    .ofType( SELECT_USER_ACTION )
    .debug( 'New user selected' )
    .map(( action: SelectUserAction ) => new LoadUserThreadsAction( action.payload ) );

}
