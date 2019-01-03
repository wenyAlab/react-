import React from 'react';
import axios from 'axios';
import { Card, WhiteSpace } from 'antd-mobile';

class Genius extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=boss').then(res => {
                this.setState({
                    list: res.data.data,
                })
            })
    }
    render() {
        const { list } = this.state;
        return (
            list.map(i => (
                <React.Fragment>
                    <WhiteSpace size="lg" />
                    {
                        i.avatar &&
                        <Card full>
                            <Card.Header
                                title={i.user}
                                thumb={require(`../../component/AvatarSelector/img/${i.avatar}.jpg`)}
                                extra={<span>{i.money}</span>}
                            />
                            <Card.Body>
                                <div>{i.desc}</div>
                            </Card.Body>
                            <Card.Footer content="footer content" extra={<div>{i.money}</div>} />
                        </Card>
                    }
                </React.Fragment>
            ))
        )
    }
}

export default Genius;