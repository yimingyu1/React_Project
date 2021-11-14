import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AddUpdateProject from './product_add_update'
import ProjectDetail from './product_detail'
import ProjectHome from './product_home'

export default class Product extends Component {
    render() {
        return (
           <Switch>
               <Route path='/product' component={ProjectHome} exact></Route>
               <Route path='/product/add' component={AddUpdateProject}></Route>
               <Route path='/product/update' component={AddUpdateProject}></Route>
               <Route path='/product/detail' component={ProjectDetail}></Route>
               <Redirect to='/product'></Redirect>
           </Switch>
        )
    }
}
