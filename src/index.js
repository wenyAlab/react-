import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossInfo/bossInfo';
import GenuisInfo from './container/genuisinfo/genuisinfo';
import reducers from './reducer';
import './config'
import AuthRouter from './component/Auth'
import DashBoard from './component/DashBoard'
import * as serviceWorker from './serviceWorker';


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))

const Error = () => (
     (<h2>404 not found</h2>)
)
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path="/geniusinfo" component={GenuisInfo}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route  component={DashBoard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
