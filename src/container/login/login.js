import React from 'react';
import { InputItem, List, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo'


class Login extends React.Component{
    register = () => {
        this.props.history.push('/register')
    }
    login = () => {
        this.props.history.push('/login')
    }
    render(){
        return (
            <React.Fragment>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.login} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>

            </React.Fragment>
        )
    }
}
export default Login;