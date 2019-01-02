import React from 'react';
import { connect} from 'react-redux';
import { InputItem, List, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo';

const RadioItem = Radio.RadioItem;

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user: '',
            pwd: '',
            confirmPwd: '',
            type: 'genius'
        }
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }
    register = () => {
        this.props.registerFn(this.state);
    }
    render(){
        const { redictPath } = this.props.user;
        return (
            <React.Fragment>
                {redictPath ? <Redirect to={redictPath}/>: null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                            type="password"
                        >密码</InputItem>
                        <InputItem
                            onChange={v => this.handleChange('confirmPwd', v)}
                            type="password"
                        >确认密码</InputItem>
                        <WhiteSpace/>

                        <RadioItem checked={this.state.type === 'genius'}
                            onChange={() => this.handleChange('type', 'genius')}
                        >求职者</RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}
                            onChange={() => this.handleChange('type', 'boss')}
                        >招聘者</RadioItem>
                    </List>
                    {/* <WhiteSpace/>
                    <Button onClick={this.login} type="primary">登录</Button> */}
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
})
const mapDispatchToProps = dispatch => {
    return {
        registerFn: (data) => {
            dispatch(register(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);