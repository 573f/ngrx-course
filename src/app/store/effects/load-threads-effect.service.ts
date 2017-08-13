import { Injectable }      from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ThreadsService }                                    from './../../services/threads.service';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction } from './../actions';

@Injectable()
export class LoadThreadsEffectService {

  @Effect() userThreads$ = this.actions$.ofType( LOAD_USER_THREADS_ACTION )
    .debug('action received')
    .switchMap(() => this.threadsService.loadUserThreads() )
    .debug('data received via the HTTP request')
    .map( allUsersData => new UserThreadsLoadedAction( allUsersData ) );

  constructor (
    private actions$: Actions,
    private threadsService: ThreadsService
  ) {}
}
