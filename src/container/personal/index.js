import React from 'react';
import { connect}  from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import BrowserCookies from 'browser-cookies';
import { signout } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img style={{width: 50, height: 50}} src={require(`../../assets/img/${src}.jpg`)} className="spe am-icon am-icon-md" alt="" />;
const alert = Modal.alert;

class Personal extends React.Component{
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut (){
        BrowserCookies.erase('userid');
        this.props.signOutClear();
    }
    render() {
        const { userInfo } = this.props;
        const { redictPath } = userInfo;
        return userInfo.user ?(
            <React.Fragment>
                {/* {redictPath ? <Redirect to={redictPath}/>: null} */}
                {
                userInfo.avatar &&
                <Result
                img={myImg(userInfo.avatar)}
                title={userInfo.user}
                message={userInfo.type === 'boss' ? userInfo.companyName : userInfo.job}
                />
                }
                <List renderHeader={() => '用户信息'}>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    wrap={true}
                    multipleLine={true}
                    >
                    {userInfo.job}
                    <Brief>{userInfo.desc}</Brief>
                    </Item>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    wrap={true}
                    multipleLine={true}
                    >
                    {userInfo.companyName}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button
                    onClick={() =>
                        alert('退出', '确认退出???', [
                        { text: '取消'},
                        { text: '确认', onPress: () => this.signOut() },
                        ])
                    }
                    >
                    退出
                </Button>
            </React.Fragment>
        ) : <Redirect to={redictPath}/>
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.user,
})
const mapDispatchToProps = (dispatch) => ({
    signOutClear() {
        dispatch(signout());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Personal);