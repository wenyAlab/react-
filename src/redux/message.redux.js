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
            return {...state, messageList: action.payload.mgsList, users: action.payload.users, unRead: action.payload.mgsList.filter(i => !i.read&&i.to===action.payload.userId).length };
        case MESSAGE_RECEIVE:
            const addNum = action.payload.data.to === action.payload.userId ? 1 : 0;
            return {...state, messageList: [...state.messageList, action.payload.data], unRead: state.unRead + addNum};
        case MESSAGE_ISREAD:
            return {...state};
        default:
            return state;
    }
}

function messageList (mgsList, users, userId) {
    return {
        type: MESSAGE_LIST,
        payload: {
            mgsList,
            users,
            userId,
        },
    }
}

export function getChatMessage() {
    return (dispatch, getState) => {
        Axios.get('/user/getMessageList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userId = getState().user._id;
                dispatch(messageList(res.data.data, res.data.users, userId))
            }
        })
    }
}

export function receiveMessage() {
    return (dispatch, getState) => {
        io.on('receiveMessage', function(data) {
            const userId = getState().user._id;
            dispatch(sendMessageFn(data, userId))
        })
    }
}

function sendMessageFn(data, userId) {
    return {
        type: MESSAGE_RECEIVE,
        payload: {
            data,
            userId,
        },
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


