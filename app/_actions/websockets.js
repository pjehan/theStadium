import io from 'socket.io-client';
import {utils} from "../_constants/utils";

const socket = io( utils.NODEJS );
export const init = ( store ) => {
    Object.keys( utils.messageTypes )
        .forEach( type => socket.on( type, ( payload ) =>
                store.dispatch({ type, payload })
            )
        );
};
export const emit = ( type, payload ) => socket.emit( type, payload );