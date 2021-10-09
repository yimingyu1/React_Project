import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import memaryUser from './utils/memaryUtil'
import storage from './utils/storageUtils'
/**
 * 定义根组件
 */
export default class App extends Component {


    render() {
        memaryUser.user = storage.getUser()
        return (
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Admin}/>
                        <Redirect to='/login' />
                    </Switch>
                </BrowserRouter>
        )
    }
}
