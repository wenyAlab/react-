import React from 'react';
import ListComponent from '../../component/ListComponent'
import { getUserList } from '../../redux/chat.redux';
import {connect} from 'react-redux';



class Genius extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        this.props.queryUserList('boss');
    }
    render() {
        const { userList } = this.props;
        return (
            <ListComponent list={userList} {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    userList: state.chat.userList,
})

const mapDispatchToProps = (dispatch) => ({
    queryUserList(type) {
        dispatch(getUserList(type));
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(Genius);

