import React from 'react';
import Login from '../../assets/logo.jpg'
import './logo.css';
class LoginComponent extends React.Component{
    render(){
        return (
            <div className="img_container">
                <img src={Login} style={{width: 100, height: 100}}/>
            </div>
        )
    }
}
export default LoginComponent;