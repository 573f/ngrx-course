import { Action } from '@ngrx/store';

import * as _ from 'lodash';

import {
    ERROR_OCCURRED_ACTION, ErrorOccurredAction,
    SELECT_USER_ACTION, SelectUserAction,
    THREAD_SELECTED_ACTION, ThreadSelectedAction
}                                    from '../actions';
import { INITIAL_UI_STATE, UiState } from  '../ui-state';

export function uiStateReducer ( state: UiState = INITIAL_UI_STATE, action: Action ): UiState {

    switch ( action.type ) {
        case THREAD_SELECTED_ACTION:
            const newState = Object.assign( {}, state );
            newState.currentThreadId = (action as ThreadSelectedAction).payload.selectedThreadId;
            return newState;

        case SELECT_USER_ACTION:
            return handleSelectUserAction( state, <any> action );

        default:
            return state;
    }
}

function handleSelectUserAction ( state: UiState, action: SelectUserAction ) {

    const newUiState = Object.assign( {}, state );

    newUiState.userId = action.payload;
    newUiState.currentThreadId = undefined;

    return newUiState;
}

function handleErrorOccurredAction( state: UiState, action: ErrorOccurredAction ) {

    const newUiState = _.cloneDeep( state );

    newUiState.currentError = action.payload;

    return newUiState;
}
