import { Message }     from './../model/message';
import { Thread }      from './../model/thread';
import { Participant } from './../model/participant';

export interface AllUserData {
    participants: Participant[];
    threads: Thread[];
    messages: Message[];
}
