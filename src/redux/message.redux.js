import Axios from "axios";
import ioClient from 'socket.io-client';
const io = ioClient('ws://localhost:9090')

// 聊天列表
const MESSAGE_LIST = 'MESSAGE_LIST';
// 接收 读取信息
const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE';
// 表示是否已读
const MESSAGE_ISREAD = 'MESSAGE_ISREAD';

const initState = {
    messageList: [],
    // is_read: false,
    users: {},
    unRead: 0,
}

export function chatMessage (state=initState, action) {
    switch(action.type) {
        case MESSAGE_LIST:
            return {...state, messageList: action.payload.mgsList, users: action.payload.users, unRead: action.payload.mgsList.filter(i => !i.read).length };
        case MESSAGE_RECEIVE:
            return {...state, messageList: [...state.messageList, action.payload], unRead: state.unRead + 1};
        case MESSAGE_ISREAD:
            return {...state};
        default:
            return state;
    }
}

function messageList (mgsList, users) {
    return {
        type: MESSAGE_LIST,
        payload: {
            mgsList,
            users,
        },
    }
}

export function getChatMessage() {
    return (dispatch) => {
        Axios.get('/user/getMessageList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(messageList(res.data.data, res.data.users))
            }
        })
    }
}

export function receiveMessage() {
    return (dispatch) => {
        io.on('receiveMessage', function(data) {
            dispatch(sendMessageFn(data))
        })
    }
}

function sendMessageFn(payload) {
    return {
        type: MESSAGE_RECEIVE,
        payload,
    }
}
export function sendMessage(payload) {
    return (dispatch) => {
        io.emit('sendMessage', payload)
        // Axios.post('user/sendMessage', payload).then(res => {
        //     if (res.status === 200) {
        //         dispatch(sendMessageFn(res.data.data))
        //     }
        // })
    }
}


