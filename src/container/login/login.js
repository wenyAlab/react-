import React from 'react';
import { InputItem, List, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';
import Logo from '../../component/logo'


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        }
    }
    register = () => {
        this.props.history.push('/register');
    }
    handleLogin = () => {
        this.props.login(this.state);
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }
    render(){
        const { redictPath } = this.props.user;
        return (
            <React.Fragment>
                {redictPath ? <Redirect to={redictPath}/>: null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    login(payload){
        dispatch(login(payload))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);