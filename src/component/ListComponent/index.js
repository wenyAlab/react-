import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getUserList } from '../../redux/chat.redux';

class ListComponent extends React.Component{
    static = {
        list: PropTypes.array.isRequired,
    }
    handleChat = (user) => {
        this.props.history.push(`/chat:${user}`)
    }
    render() {
        const { list } = this.props;
        return (
            list ? list.map(i => (
                <React.Fragment key={i._id}>
                    <WhiteSpace size="lg"/>
                        {
                            i.avatar &&
                            <Card
                                full
                                key={i._id}
                                onClick={() => this.handleChat(i.user)}
                            >
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