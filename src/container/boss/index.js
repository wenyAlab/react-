import React from 'react';

import ListComponent from '../../component/ListComponent'

class Boss extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    render() {
        return (
            <ListComponent type='genius'/>
        )
    }
}

export default Boss;