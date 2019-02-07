import React from 'react';
import { InputItem, List, NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import { getChatMessage, sendMessage, receiveMessage } from '../../redux/message.redux';
import './message.css'
import ioClient from 'socket.io-client';
const io = ioClient('ws://localhost:9090')

const Item  = List.Item;
class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            messageList: [],
        }
    }
    componentDidMount(){
        // io.on('receiveMessage', (data) => {
        //     this.setState({
        //         messageList: [...this.state.messageList, data.message]
        //     })
        // })
        // this.props.chatMessageFn();
        // this.props.receiveMessageFn();
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
    render() {
        const {messageList} = this.props.chatMessage;
        const user = this.props.match.params.user;
        
        return (
            <div id="chat_page">
                <NavBar mode="light">
                    {this.props.match.params.user}
                </NavBar>
                {
                    messageList.length > 0 && messageList.map(i => {
                        return i.from === user ? (
                            <List key={i._id}>
                                <Item
                                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                >
                                    {i.message}
                                </Item>
                            </List>
                            // <p key={i._id}>对方发来的{i.message}</p>
                        ) : (
                            <List key={i._id}>
                                <Item
                                    extra={<img src='https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'/>}
                                    className="chat_me"
                                >
                                    {i.message}
                                </Item>
                            </List>
                        )
                        // return <p key={i._id}>{i.message}</p>
                    })
                }
                <div className='chat_message_box'>
                    <List>
                        <InputItem
                            value={this.state.inputValue}
                            onChange={(value) => this.handleChange(value)}
                            placeholder="请输入你的想法"
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        >

                        </InputItem>
                    </List>
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
    // chatMessageFn() {
    //     dispatch(getChatMessage())
    // },
    // receiveMessageFn() {
    //     dispatch(receiveMessage())
    // },
    sendMessageFn(payload) {
        dispatch(sendMessage(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);