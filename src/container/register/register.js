import React from 'react';
import { connect} from 'react-redux';
import { InputItem, List, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo';
import HandleChange from '../../component/HandleChange';
const RadioItem = Radio.RadioItem;

class Register extends React.Component{
    componentDidMount(){
        this.props.handleChange('type', 'genius')
    }
    register = () => {
        this.props.registerFn(this.props.state);
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
                            onChange={v => this.props.handleChange('user', v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.props.handleChange('pwd', v)}
                            type="password"
                        >密码</InputItem>
                        <InputItem
                            onChange={v => this.props.handleChange('confirmPwd', v)}
                            type="password"
                        >确认密码</InputItem>
                        <WhiteSpace/>

                        <RadioItem checked={this.props.state.type === 'genius'}
                            onChange={() => this.props.handleChange('type', 'genius')}
                        >求职者</RadioItem>
                        <RadioItem checked={this.props.state.type === 'boss'}
                            onChange={() => this.props.handleChange('type', 'boss')}
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
export default connect(mapStateToProps, mapDispatchToProps)(HandleChange(Register));