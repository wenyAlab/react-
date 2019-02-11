import React from 'react';
import { List,Badge } from 'antd-mobile';
import {connect} from 'react-redux';

const Item = List.Item;
const Brief = Item.Brief;

class MesList extends React.Component{

    getLastChatItem = (arr) => {
        return arr[arr.length - 1];
    }
    goToChat = (id) => {
        this.props.history.push(`/chat/${id}`)
    }
    render(){
        const { chatMessage, user} = this.props;
        const { messageList, users } = chatMessage;
        const userId = user._id;

        const msgGroup = {};
        messageList.forEach(i => {
            msgGroup[i.chat_id] = msgGroup[i.chat_id] || [];
            msgGroup[i.chat_id].push(i);
        });
        // 最新消息置顶
        const filnalMesList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLastChatItem(a).create_time;
            const b_last = this.getLastChatItem(b).create_time;
            return b_last - a_last;
        });
        return (
            <React.Fragment>
                {filnalMesList && filnalMesList.length>0 && filnalMesList.map(i => {
                    const lastChatItem = this.getLastChatItem(i);
                    const targetId = i[0].from===userId ? i[0].to : i[0].from;
                    const unReadNum = i.filter(v => !v.is_read && v.to === userId).length;
                    if (!users[targetId]) {
                        return null
                    }
                    const finalAvatar = (users&&users[targetId]&&users[targetId].avatar)&&require(`../message/img/${users&&users[targetId]&&users[targetId].avatar}.jpg`);

                    return (
                        <List key={lastChatItem._id}>
                            <Item
                            extra={<Badge text={unReadNum}/>}
                            thumb={finalAvatar}
                            arrow="horizontal"
                            // 注意思考为什么是targetid
                            onClick={() => (this.goToChat(targetId))}
                            >
                            {lastChatItem.message}
                            <Brief>{users&&users[targetId]&&users[targetId].user}</Brief>
                            </Item>
                        </List>
                    )
                })}
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    chatMessage: state.chatMessage,
    user: state.user,
})

export default connect(mapStateToProps, null)(MesList);