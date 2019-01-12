import React from 'react';
import ListComponent from '../../component/ListComponent'


class Genius extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    render() {
        return (
            <ListComponent type='boss'/>
        )
    }
}

export default Genius;