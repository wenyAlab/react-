import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { UserInfo } from '../../redux/user.redux';

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
                // 踩过坑  code应该为0
                if (res.data.code === 0) {
                    // 有登陆信息
                    this.props.loadUserInfo(res.data.data);
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
const mapDispatchToProps = (dispatch) => ({
    loadUserInfo(payload) {
        dispatch(UserInfo(payload))
    }
})
export default withRouter(connect(null, mapDispatchToProps)(AuthRouter));