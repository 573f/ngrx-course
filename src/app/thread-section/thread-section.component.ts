import { Observable } from 'rxjs/Observable';
import { LoadUserThreadsAction, UserThreadsLoadedAction } from './../store/actions';
import { ApplicationState }      from './../store/application-state';
import { ThreadsService }        from './../services/threads.service';
import { Component, OnInit }     from '@angular/core';
import { Store }                 from '@ngrx/store';

@Component( {
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: [ './thread-section.component.css' ]
} )
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;

  constructor (
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip( 1 )
      .map( this.mapStateToUserName );
  }

  mapStateToUserName ( state: ApplicationState ): string {
    return state.storeData.participants[ state.uiState.userId ].name;
  }

  ngOnInit () {
    this.threadsService.loadUserThreads()
      .subscribe(
      allUserData => {
        console.log( 'ThreadService got: ', allUserData );
        this.store.dispatch(
          new UserThreadsLoadedAction( allUserData ));
      }
    );
  }
}
