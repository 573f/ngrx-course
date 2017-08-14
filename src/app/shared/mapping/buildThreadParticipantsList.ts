import * as _ from 'lodash';

import { Thread }           from '../../../../shared/model/thread';
import { ApplicationState } from '../../store/application-state';

export function buildThreadParticipantsList ( state: ApplicationState, thread: Thread ): string {

    const names = _.keys( thread.participants ).map(
        participantId => state.storeData.participants[ participantId ].name );

    return _.join( names, ',' );
}
