import { Action } from '@ngrx/store';

import * as _ from 'lodash';

import { Message } from '../../../../shared/model/message';
import {
    LOAD_USER_THREADS_ACTION, LoadUserThreadsAction,
    SEND_NEW_MESSAGE_ACTION, SendNewMessageAction,
    USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction,
    NEW_MESSAGES_RECEIVED_ACTION, NewMessageReceivedAction,
    THREAD_SELECTED_ACTION, ThreadSelectedAction
} from '../actions';
import { StoreData } from './../store-data';

declare var require: any;
const uuid = require( 'uuid/V4' );

export function storeDataReducer( state: StoreData, action: Action ): StoreData {
    switch ( action.type ) {
        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction( state, <any> action );
        case SEND_NEW_MESSAGE_ACTION:
            return handleSendNewMessageAction( state, <any> action );
        case NEW_MESSAGES_RECEIVED_ACTION:
            return handleNewMessagesReceivedAction( state, <any> action );
        case THREAD_SELECTED_ACTION:
            return handleThreadSelectedAction( state, <any> action );
        default:
            return state;
    }
}

function handleLoadUserThreadsAction( state: StoreData, action: UserThreadsLoadedAction ): StoreData {
    return {
        participants: _.keyBy( action.payload.participants, 'id' ),
        messages: _.keyBy( action.payload.messages, 'id' ),
        threads: _.keyBy( action.payload.threads, 'id' )
    };
}

function handleSendNewMessageAction( state: StoreData, action: SendNewMessageAction ) {

    const newStoreState = _.cloneDeep( state );

    newStoreState.threads[ action.payload.threadId ] = Object.assign( {}, state.threads[ action.payload.threadId ] );

    const currentThread = newStoreState.threads[ action.payload.threadId ];

    const newMessage: Message = {
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
        id: uuid()
    };

    currentThread.messageIds = currentThread.messageIds.slice( 0 );
    currentThread.messageIds.push( newMessage.id );

    newStoreState.messages[ newMessage.id ] = newMessage;

    return newStoreState;
}

function handleNewMessagesReceivedAction( state: StoreData, action: NewMessageReceivedAction ): StoreData {
    const newStoreState = _.cloneDeep( state );

    const newMessages = action.payload.unreadMessages;
    const currentThreadId = action.payload.currentThreadId;
    const currentUserId = action.payload.currentUserId;

    newMessages.forEach( message => {
        newStoreState.messages[ message.id ] = message;
        newStoreState.threads[ message.threadId ].messageIds.push( message.id );
        if ( message.threadId !== currentThreadId ) {
            newStoreState.threads[ message.threadId ].participants[ currentUserId ]++;
        }
    } );

    return newStoreState;
}

function handleThreadSelectedAction( state: StoreData, action: ThreadSelectedAction ) {

    const newStoreState = _.cloneDeep( state );

    newStoreState.threads[ action.payload.selectedThreadId ] = Object.assign( {}, state.threads[ action.payload.selectedThreadId ] );

    const currentThread = newStoreState.threads[ action.payload.selectedThreadId ];

    currentThread.participants = Object.assign( {}, currentThread.participants );

    currentThread.participants[ action.payload.currentUserId ] = 0;

    return newStoreState;
}
