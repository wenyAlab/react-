import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
// import axios from 'axios';
import {connect} from 'react-redux';
import { getUserList } from '../../redux/chat.redux';

class ListComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],

        }
    }
    componentDidMount() {
        const { type } = this.props;
        this.props.queryUserList(type);
    }
    render() {
        const { userList } = this.props;
        return (
            userList ? userList.map(i => (
                <React.Fragment key={i._id}>
                    <WhiteSpace size="lg"/>
                        {
                            i.avatar &&
                            <Card full key={i._id}>
                                <Card.Header
                                title={i.user}
                                thumb={require(`../AvatarSelector/img/${i.avatar}.jpg`)}
                                extra={<span>{i.job}</span>}
                                thumbStyle={{width: '40px'}}
                            />
                                <Card.Body>
                                    <div>{i.desc && i.desc.split('\n').map(v => (
                                        <div key={v}>{v}</div>
                                    ))}</div>
                                </Card.Body>
                                <Card.Footer content={i.companyName} extra={<div>{i.money}</div>} />
                            </Card>
                        }
                </React.Fragment>
            )) : 'no data'
        )
    }
}

const mapStateToProps = (state) => ({
    userList: state.userList,
})

const mapDispatchToProps = (dispatch) => ({
    queryUserList(type) {
        getUserList(type);
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ListComponent);