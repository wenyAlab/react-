import React from 'react';
import { InputItem, List, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import { getChatId } from '../../util';
import { getChatMessage, sendMessage, receiveMessage,readMessage } from '../../redux/message.redux';
import './message.css'
// import DefaultAvatar from './img/avatar.svg';
// import ioClient from 'socket.io-client';
// const io = ioClient('ws://localhost:9090')

const Item  = List.Item;
class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            messageList: [],
            emojiShow: false,
            listMargin: 100,
        }
    }
    componentDidMount(){
        const {messageList} = this.props.chatMessage;
        if (!messageList.length) {
            this.props.chatMessageFn();
            this.props.receiveMessageFn();
        }
        const to = this.props.match.params.user;
        this.props.readMessageFn(to);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }
    handleChange = (value) => {
        this.setState({
            inputValue: value
        })
    }
    handleSubmit = () => {
        // io.emit('sendMessage', {message: this.state.inputValue})
        const payload = {
            from: this.props.user._id,
            to: this.props.match.params.user,
            message: this.state.inputValue
        }
        this.props.sendMessageFn(payload);
        this.setState({
            inputValue: '',
        })
    }
    handleEmoji = () => {
        this.setState({
            emojiShow: !this.state.emojiShow,
            listMargin: this.state.listMargin === 100 ? 300 : 100,
        })
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }
    clickEmoji = (e) => {
        this.setState({
            inputValue: this.state.inputValue + e.text,
        })
    }
    render() {
        const emoji = '😃 😂 😍 🥰 🤔 😊 😳 😇 😃 😂 😍 🥰 🤔 😊 😳 😝 🤗 🤭 🤫 🤐 😏 🙄 😬 😌 😔 🤒 😳 🥺 😭 🙂 🤣 😗 😋 😛 😜 🤪 😝 😆'.split(' ')
                        .filter(v => v)
                        .map(i => ({text: i}))
        const {messageList, users} = this.props.chatMessage;
        const userId = this.props.match.params.user;
        const { emojiShow, listMargin } = this.state;
        // const 
        if(!(users&&users[userId]&&users[userId])) {
            return null;
        }
        const chatId = getChatId(userId, this.props.user._id);
        const finalMesList = messageList.filter(i => i.chat_id === chatId);
        return (
            <div id="chat_page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users&&users[userId]&&users[userId].user}
                </NavBar>
                <div style={{marginBottom:listMargin}}>
                    {
                        finalMesList.length > 0 && finalMesList.map(i => {
                            const avatar = users&&users[i.from]&&users[i.from].avatar && require(`./img/${users[i.from].avatar}.jpg`);
                            return i.from === userId ? (
                                <List key={i._id}>
                                    <Item
                                        thumb={avatar}
                                    >
                                        {i.message}
                                    </Item>
                                </List>
                            ) : (
                                <List key={i._id}>
                                    <Item
                                        extra={<img src={avatar} alt="avatar"/>}
                                        className="chat_me"
                                    >
                                        {i.message}
                                    </Item>
                                </List>
                            )
                        })
                    }
                </div>
                <div className='chat_message_box'>
                    <List>
                        <InputItem
                            value={this.state.inputValue}
                            onChange={(value) => this.handleChange(value)}
                            placeholder="请输入你的问题"
                            extra={
                            <div>
                                <span role="img" onClick={() => this.handleEmoji()}>😃</span>
                                <span style={{marginLeft: '8px'}} onClick={() => this.handleSubmit()}>发送</span>
                            </div>
                            }
                        >

                        </InputItem>
                    </List>
                    {
                        emojiShow &&
                        <Grid
                            data={emoji}
                            isCarousel
                            columnNum={8}
                            carouselMaxRow={4}
                            hasLine={false}
                            onClick={_el => this.clickEmoji(_el)} 
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    chatMessage: state.chatMessage,
});

const mapDispatchToProps = (dispatch) => ({
    chatMessageFn() {
        dispatch(getChatMessage())
    },
    receiveMessageFn() {
        dispatch(receiveMessage())
    },
    sendMessageFn(payload) {
        dispatch(sendMessage(payload))
    },
    readMessageFn(payload) {
        dispatch(readMessage(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);