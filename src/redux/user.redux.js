import axios from 'axios';
import {getRedictPath} from '../util';
const LOGIN_SUCCESS = 'USER_LOGIN';
const REGISTER_SUCESS = 'REGISTER_SUCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    mes: '',
    redictPath: '',
    isAuth: false,
    user: '',
    pwd: '',
    type: '',
}
// reducer
export function user(state=initState, action){
    switch (action.type) {
        case REGISTER_SUCESS:
            return {...state, mes: '', redictPath: getRedictPath(action.payload), isAuth: true,...action.payload}    
        case ERROR_MSG:
            return {...state, mes: action.payload, isAuth: false}    
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
function registerSuc(data) {
    return {
        type: REGISTER_SUCESS,
        payload: data,
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
                dispatch(registerSuc({user, pwd, type}));
            } else {
                dispatch(errorMsg(res.data.message))
            }
        })
    }
}