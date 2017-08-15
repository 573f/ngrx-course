import { Component, OnInit } from '@angular/core';
import { Store }             from '@ngrx/store';

import * as _         from 'lodash';
import { Observable } from 'rxjs/Observable';

import { Thread }                          from './../../../shared/model/thread';
import { ThreadsService }                  from './../services/threads.service';
import { LoadUserThreadsAction, ThreadSelectedAction }           from './../store/actions';
import { ApplicationState }                from './../store/application-state';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import { userNameSelector }                from './userNameSelector';
import { stateToThreadSummariesSelector }  from './stateToThreadSummariesSelector';
import { ThreadSummaryVM }                 from './thread-summary.vm';

@Component( {
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: [ './thread-section.component.css' ]
} )
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;

  constructor ( private store: Store<ApplicationState> ) {
    this.userName$ = store.select( userNameSelector );
    this.unreadMessagesCounter$ = store.map( mapStateToUnreadMessagesCounter );
    this.threadSummaries$ = store.select( stateToThreadSummariesSelector );
    this.currentSelectedThreadId$ = store.select( state => state.uiState.currentThreadId );
  }

  ngOnInit () {
    this.store.dispatch( new LoadUserThreadsAction() );
  }

  onThreadSelected ( selectedThreadId: number ) {
    this.store.dispatch( new ThreadSelectedAction( selectedThreadId ) );
  }
}
