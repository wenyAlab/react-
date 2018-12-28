import React from 'react';
import { NavBar, Icon, TextareaItem, InputItem, WhiteSpace, Button} from 'antd-mobile';
import AvatarSelector from '../../component/AvatarSelector/AvatarSelector'

class BossInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            job: '',
            companyName: '',
            money: '',
            desc: '',
            avatar: '',
        }
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }
    render() {
        return (
            <div>

                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                <Icon key="1" type="ellipsis" />,
                ]}
                >
                boss
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
                    >招聘职位</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v => this.handleChange('companyName', v)}
                    >公司名称</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v => this.handleChange('money', v)}
                    >职位薪资</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                    title="职位要求"
                        onChange={v => this.handleChange('desc', v)}
                        rows={3}
                        autoHeight
                    />
                    <WhiteSpace/>
                    <Button type="primary">确定</Button>
                {/* </List> */}
            </div>
        )
    }
}

export default BossInfo;