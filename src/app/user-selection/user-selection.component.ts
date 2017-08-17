import { SelectUserAction } from '../store/actions';
import { ApplicationState } from './../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor (
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
  }

  onSelectUser ( newUserId: number ) {
    console.log( 'newUserId: ', newUserId );
    this.store.dispatch( new SelectUserAction( newUserId ) );
  }
}
