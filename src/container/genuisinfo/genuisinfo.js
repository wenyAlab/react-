import React from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, TextareaItem, InputItem, WhiteSpace, Button} from 'antd-mobile';
import AvatarSelector from '../../component/AvatarSelector/AvatarSelector'
import { toSaveInfo } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';


class GenuisInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            job: '',
            personalDes: '',
            avatar: '',
        }
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }
    render() {
        const { redictPath } = this.props.user;
        const path = this.props.location.pathname;
        return (
            <div>
                {(redictPath && redictPath !== path) ? <Redirect to={redictPath}/>: null}

                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                <Icon key="1" type="ellipsis" />,
                ]}
                >
                Genuis
                </NavBar>
                <AvatarSelector
                    avatarSelectFn={(text) => {
                        this.setState({
                            avatar: text,
                        })
                    }
                    }
                ></AvatarSelector>
                {/* <List> */}
                    <InputItem
                        onChange={v => this.handleChange('job', v)}
                    >求职岗位</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                    title="个人简介"
                        onChange={v => this.handleChange('personalDes', v)}
                        rows={3}
                        autoHeight
                    />
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button
                        type="primary"
                        onClick={()=>this.props.saveInfo(this.state)}
                    >确定</Button>
                {/* </List> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    saveInfo(payload){
        dispatch(toSaveInfo(payload))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(GenuisInfo);