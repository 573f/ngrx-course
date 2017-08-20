import { Component } from '@angular/core';
import { Store }     from '@ngrx/store';

import * as _         from 'lodash';
import { Observable } from 'rxjs/Observable';

import { UiState }                                     from '../store/ui-state';
import { Thread }                                      from './../../../shared/model/thread';
import { ThreadsService }                              from './../services/threads.service';
import { LoadUserThreadsAction, ThreadSelectedAction } from './../store/actions';
import { ApplicationState }                            from './../store/application-state';
import { mapStateToUnreadMessagesCounter }             from './mapStateToUnreadMessagesCounter';
import { stateToThreadSummariesSelector }              from './stateToThreadSummariesSelector';
import { ThreadSummaryVM }                             from './thread-summary.vm';
import { userNameSelector }                            from './userNameSelector';

@Component( {
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: [ './thread-section.component.css' ]
} )
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;

  uiState: UiState;

  constructor ( private store: Store<ApplicationState> ) {
    this.userName$ = store.select( userNameSelector );
    this.unreadMessagesCounter$ = store.map( mapStateToUnreadMessagesCounter );
    this.threadSummaries$ = store.select( stateToThreadSummariesSelector );
    store.select( state => state.uiState ).subscribe( uiState => this.uiState = _.cloneDeep( uiState ) );
  }

  onThreadSelected ( selectedThreadId: number ) {
      this.store.dispatch( new ThreadSelectedAction( { selectedThreadId, currentUserId: this.uiState.userId } ) );
  }
}
