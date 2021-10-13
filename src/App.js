import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
/**
 * 定义根组件
 */
export default class App extends Component {

    
    render() {
        console.log('app', this);
        return (
                <BrowserRouter>
                    <Switch>
                        <Route  path='/login' component={Login}/>
                        <Route  path='/' component={Admin}/>
                    
                    </Switch>
                </BrowserRouter>
        )
    }
}
