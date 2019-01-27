import Axios from "axios";

const MESSAGE_LIST = 'MESSAGE_LIST';

const initState = {
    messageList: [],
}

export function chatMessage (state=initState, action) {
    switch(action.type) {
        case MESSAGE_LIST:
            return {...state};
        default:
            return state;
    }
}

function chat (payload) {
    return {
        type: MESSAGE_LIST,
        payload,
    }
}

export function getChatMessage(dispatch) {
    Axios.get('/chat').then(res => {
        if (res.status === 200) {
            dispatch(chat(res.data.data))
        }
    })
}


