import React from 'react';

export default function(Component){
    return class HandleChange extends React.Component{
        constructor(props){
            super(props);
            this.state = {};

        }
        handleChange = (key, value) => {
            this.setState({
                [key]: value,
            })
        }
        render(){
            return <Component handleChange={this.handleChange} state={this.state} {...this.props}/>
        }
    }
}