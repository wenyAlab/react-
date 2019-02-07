import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TabBarLink extends React.Component{
    static = {
        tabLink: PropTypes.array.isRequired,
        badge: PropTypes.number,
    }
    onHandlePress = (path) => {
        this.props.history.push(path)
    }
    render(){
        const { chatMessage } = this.props;
        const { pathname } = this.props.location;
        const tabList = this.props.tabLink.filter(i => !i.hide)
        return (
           <TabBar>
               {
               tabList.map(i => (
                   <TabBar.Item
                    badge={i.path === '/message' && chatMessage.unRead}
                    title={i.text}
                    key={i.path}
                    icon={{uri: require(`./img/${i.icon}_selected.svg`)}}
                    selectedIcon={{uri: require(`./img/${i.icon}.svg`)}}
                    selected={i.path === pathname}
                    onPress={() => (this.onHandlePress(i.path))}
                   >

                   </TabBar.Item>
               ))
               }
           </TabBar>
        )
    }
}
const mapStateToProps = (state) => ({
    chatMessage: state.chatMessage,
})



export default withRouter(connect(mapStateToProps, null)(TabBarLink));