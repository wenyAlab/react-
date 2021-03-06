import axios from 'axios';
import {getRedictPath} from '../util';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const USER_DATA = 'USER_DATA';
const AVATAR_SELECT = 'AVATAR_SELECT';
const LOGOUT_CLEAR = 'LOGOUT_CLEAR';

/**
 * 此reducer为登录、注册用户reducer
 */
const initState = {
    mes: '',
    redictPath: '',
    // isAuth: false,
    user: '',
    type: '',
    avatar: '',
}
// reducer
export function user(state=initState, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, mes: '', redictPath: getRedictPath(action.payload),...action.payload}    
        case ERROR_MSG:
            return {...state, mes: action.payload, isAuth: false}    
        case USER_DATA:
            return {...state, ...action.payload}    
        case AVATAR_SELECT:
            return {...state, avatar: action.payload}    
        case LOGOUT_CLEAR:
            return {...initState, redictPath: '/login'};    
        default:
            return state;
    }
}
function errorMsg(mes) {
    return {
        type: ERROR_MSG,
        payload: mes
    }
}
function authSuc(data) {
    return {
        type: AUTH_SUCCESS,
        payload: data,
    }
}

export function signout() {
    return {
        type: LOGOUT_CLEAR,
    }
}

export function register({user, pwd, type, confirmPwd}) {

    if (!user || !pwd || !type) {
        return errorMsg('用户名或密码为空')
    }
    if (pwd !== confirmPwd){
        return errorMsg('两次输入密码不同')
    }
    return (dispatch) => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            // console.log(user, pwd, type)
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuc({user, pwd, type}));
            } else {
                dispatch(errorMsg(res.data.message))
            }
        })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码错误')
    }
    return (dispatch) => {
        axios.post('/user/login', {user,pwd}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuc(res.data.data))
            } else {
                 dispatch(errorMsg(res.data.message))
            }
        })
    }
}
export function UserInfo(userInfo) {
    return { 
        type: USER_DATA,
        payload: userInfo,
    }
}
// export function userload({user, pwd}) {
//     if (!user || !pwd) {
//         return errorMsg('用户名或密码错误')
//     }
//     return (dispatch) => {
//         axios.get('/user/info').then(res => {
//             if (res.status === 200) {
//                 // 踩过坑  code应该为0
//                 if (res.data.code === 0) {
//                     dispatch(UserInfo(res.data.data))
//                 } else {
//                     this.props.history.push('/login')
//                 }
//             }
//         })
//     }
// }

export function avatarSelector (text) {
    return {
        type: AVATAR_SELECT,
        payload: text,
    }
}

// 保存boss 或者 应聘者 的信息

export function toSaveInfo(payload) {
    return (dispatch) => {
        axios.post('/user/saveinfo', payload).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuc(res.data.data))
            } else {
                 dispatch(errorMsg(res.data.message));
            }
        })
    }
}
