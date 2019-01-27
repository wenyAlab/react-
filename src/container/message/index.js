import React from 'react';
import ioClient from 'socket.io-client';
import { InputItem, List} from 'antd-mobile';
const io = ioClient('ws://localhost:9090')

class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            messageList: [],
        }
    }
    componentDidMount(){
        io.on('receiveMessage', (data) => {
            this.setState({
                messageList: [...this.state.messageList, data.message]
            })
        })
    }
    handleChange = (value) => {
        this.setState({
            inputValue: value
        })
    }
    handleSubmit = () => {
        io.emit('sendMessage', {message: this.state.inputValue})
        this.setState({
            inputValue: '',
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.messageList.length > 0 && this.state.messageList.map(i => {
                        return <p key={i}>{i}</p>
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

export default Message;