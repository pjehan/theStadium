
const messageTypes = [
    'userJoined',
    'userLeft',
    'notificationSend',
    'notificationReceived',
    'message'
].reduce((accum, msg) => {
    accum[ msg ] = msg;
    return accum
}, {});

export const utils = {
    NODEJS : 'http://192.168.1.95:3000/',
    messageTypes
};
