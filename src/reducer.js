import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chat } from './redux/chat.redux';
import { chatMessage } from './redux/message.redux';
export default combineReducers({user, chat, chatMessage});