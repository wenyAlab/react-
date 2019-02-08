import React from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import {connect} from 'react-redux';
import { Switch , Route} from 'react-router-dom';
import TabBarLink from '../../component/TabBarLink';
import Boss from '../../container/boss';
import { getChatMessage, receiveMessage } from '../../redux/message.redux';

import Genius from '../../container/genius';
import Personal from '../../container/personal';
import MesList from '../../container/mesList';


class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        const {messageList } = this.props.chatMessage;
        if (!messageList.length) {
            this.props.chatMessageFn();
            this.props.receiveMessageFn();
        }
    }
    render(){
        const {user, chatMessage } = this.props;
        const { unRead } = chatMessage;
        const { pathname } = this.props.location;
        const tabList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'home',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius',
            },
            {
                path: '/genius',
                text: '老板',
                icon: 'home',
                title: '老板列表',
                component: Genius,
                hide: user.type === 'boss',
            },
            {
                path: '/message',
                // badge: unRead,
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: MesList,
                // hide: this.props.user === 'genius',
            },
            {
                path: '/personal',
                text: '个人中心',
                icon: 'me',
                title: '个人中心',
                component: Personal,
                // hide: this.props.user === 'genius',
            },
        ];
        return (
            <div>
                <NavBar mode="light" className="fix_header">
                    {tabList.find(v => v.path === pathname).title}
                </NavBar>
                <div style={{marginTop: 10}}>
                    <Switch>
                    {
                        tabList.map(i => (
                            <Route key={i.path} path={i.path} component={i.component}></Route>
                        ))
                    }
                    </Switch>
                </div>
                <TabBarLink tabLink={tabList}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    chatMessage: state.chatMessage,
})
const mapDispatchToProps = (dispatch) => ({
    chatMessageFn() {
        dispatch(getChatMessage())
    },
    receiveMessageFn() {
        dispatch(receiveMessage())
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);