/**
 * 此reducer为用户列表，聊天reducer
 */
import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userList: [],
}

export function chat(state=initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload};    
        default:
            return state;
    }
}

function getUserListSuc(payload) {
    return {
        type: USER_LIST,
        payload: payload,
    }
}


export function getUserList(type) {
    return (dispatch) => {
        axios.get(`/user/list?type=${type}`).then(res => {
            if (res.status === 200) {
                dispatch(getUserListSuc(res.data.data))
            }
        })
    }
}

