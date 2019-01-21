import React from 'react';
import { connect}  from 'react-redux';
import { Result, List, WhiteSpace, Button } from 'antd-mobile';


const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img style={{width: 50, height: 50}} src={require(`../../assets/img/${src}.jpg`)} className="spe am-icon am-icon-md" alt="" />;


class Personal extends React.Component{
    render() {
        const { userInfo } = this.props;
        return (
            <React.Fragment>
                {
                userInfo.avatar &&
                <Result
                img={myImg(userInfo.avatar)}
                title={userInfo.user}
                message={userInfo.type === 'boss' ? userInfo.companyName : userInfo.job}
                />
                }
                <List renderHeader={() => '用户信息'}>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {}}
                    wrap={true}
                    multipleLine={true}
                    >
                    {userInfo.job}
                    <Brief>{userInfo.desc}</Brief>
                    </Item>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {}}
                    arrow="horizontal"
                    wrap={true}
                    multipleLine={true}
                    >
                    {userInfo.companyName}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button>退出</Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.user,
})

export default connect(mapStateToProps, null)(Personal);