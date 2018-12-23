import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthRouter extends React.Component{
    componentDidMount(){
        // 获取用户信息
        const publicList = ['/login', '/register'];
        const url = this.props.location.pathname;
        if (publicList.indexOf(url) > -1) {
            return null;
        }
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 1) {
                    // 有登陆信息
                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}
export default withRouter(AuthRouter);