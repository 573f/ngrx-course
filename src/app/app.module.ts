import { NgModule }            from '@angular/core';
import { HttpModule }          from '@angular/http';
import { BrowserModule }       from '@angular/platform-browser';
import { EffectsModule }       from '@ngrx/effects';
import { StoreModule }         from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment }               from './../environments/environment';
import { AppComponent }              from './app.component';
import { MessageListComponent }      from './message-list/message-list.component';
import { MessageSectionComponent }   from './message-section/message-section.component';
import { ThreadsService }            from './services/threads.service';
import { INITIAL_APPLICATION_STATE } from './store/application-state';
import { LoadThreadsEffectService }  from './store/effects/load-threads-effect.service';
import { uiStateReducer }            from './store/reducers/uiStateReducer';
import { storeDataReducer }          from './store/reducers/uiStoreDataReducer';
import { ThreadListComponent }       from './thread-list/thread-list.component';
import { ThreadSectionComponent }    from './thread-section/thread-section.component';
import { UserSelectionComponent }    from './user-selection/user-selection.component';

@NgModule( {
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(
      {
        storeData: storeDataReducer,
        uiState: uiStateReducer
      },
      {
        initialState: INITIAL_APPLICATION_STATE
      }
    ),
    EffectsModule.forRoot( [
      LoadThreadsEffectService
    ] ),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [
    LoadThreadsEffectService,
    ThreadsService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
