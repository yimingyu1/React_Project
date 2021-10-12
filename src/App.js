import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
/**
 * 定义根组件
 */
export default class App extends Component {

    constructor(props){
        super(props)
        this.aaa = 11
    }
    
    render() {
        console.log('app', this);
        return (
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Admin}/>
                        <Redirect to='/home' />
                    </Switch>
                </BrowserRouter>
        )
    }
}
