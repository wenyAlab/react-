import React from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import {connect} from 'react-redux';
import { Switch , Route} from 'react-router-dom';
import TabBarLink from '../../component/TabBarLink';
import Boss from '../../container/boss';
import Genius from '../../container/genius';

// const Genius = () => {
//     return <h2>Genius</h2>
// }
const Message = () => {
    return <h2>Message</h2>
}
const Personal = () => {
    return <h2>Personal</h2>
}
class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const {user } = this.props;
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
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Message,
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
        ]
        return (
            <div>
                <NavBar mode="light" className="fix_header">
                    {tabList.find(v => v.path === this.props.location.pathname).title}
                </NavBar>
                <div style={{marginTop: 10}}>
                    <Switch>
                    {
                        tabList.map(i => (
                            // console.log(i.component)
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
})

export default connect(mapStateToProps)(DashBoard);