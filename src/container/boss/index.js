import React from 'react';
import {connect} from 'react-redux';
import { getUserList } from '../../redux/chat.redux';
import { Card, WhiteSpace } from 'antd-mobile';

// import ListComponent from '../../component/ListComponent'

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
        console.log(userList)
        return (
            // <ListComponent list={userList} />
            // userList && userList.map(i => (
            //     <React.Fragment key={i._id}>
            //         <WhiteSpace size="lg"/>
            //             {
            //                 i.avatar &&
            //                 <Card full key={i._id}>
            //                     <Card.Header
            //                     title={i.user}
            //                     thumb={require(`../../component/AvatarSelector/img/${i.avatar}.jpg`)}
            //                     extra={<span>{i.job}</span>}
            //                     thumbStyle={{width: '40px'}}
            //                 />
            //                     <Card.Body>
            //                         <div>{i.desc && i.desc.split('\n').map(v => (
            //                             <div key={v}>{v}</div>
            //                         ))}</div>
            //                     </Card.Body>
            //                     <Card.Footer content={i.companyName} extra={<div>{i.money}</div>} />
            //                 </Card>
            //             }
            //     </React.Fragment>))
            <div>weiwei</div>
        )
    }
}

const mapStateToProps = (state) => ({
    userList: state.userList,
})

const mapDispatchToProps = (dispatch) => ({
    queryUserList(type) {
        dispatch(getUserList(type));
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(Boss);
