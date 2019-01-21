import React from 'react';
import {connect} from 'react-redux';
import { getUserList } from '../../redux/chat.redux';

import ListComponent from '../../component/ListComponent'

class Boss extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        this.props.queryUserList('genius');
    }

    render() {
        const { userList } = this.props;
        return (
            <ListComponent list={userList} />
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

export default connect(mapStateToProps,mapDispatchToProps)(Boss);
