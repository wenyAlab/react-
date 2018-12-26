import axios from 'axios';
import {getRedictPath} from '../util';
const LOGIN_SUCCESS = 'USER_LOGIN';
const REGISTER_SUCESS = 'REGISTER_SUCESS';
const ERROR_MSG = 'ERROR_MSG';
const USER_DATA = 'USER_DATA';

const initState = {
    mes: '',
    redictPath: '',
    isAuth: false,
    user: '',
    type: '',
}
// reducer
export function user(state=initState, action){
    switch (action.type) {
        case REGISTER_SUCESS:
            return {...state, mes: '', redictPath: getRedictPath(action.payload), isAuth: true,...action.payload}    
        case LOGIN_SUCCESS:
            return {...state, mes: '', redictPath: getRedictPath(action.payload), isAuth: true,...action.payload}    
        case ERROR_MSG:
            return {...state, mes: action.payload, isAuth: false}    
        case USER_DATA:
            return {...state, ...action.payload}    
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
function loginSuc (data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    }
}
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码错误')
    }
    return (dispatch) => {
        axios.post('/user/login', {user,pwd}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(loginSuc(res.data.data))
            } else {
                return errorMsg(res.data.message)
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
export function userload({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码错误')
    }
    return (dispatch) => {
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                // 踩过坑  code应该为0
                if (res.data.code === 0) {
                    // 有登陆信息
                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }
}