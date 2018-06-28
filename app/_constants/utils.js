
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
    NODEJS : 'http://192.168.43.103:3000/',
    messageTypes
};
