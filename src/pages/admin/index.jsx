import React, { Component } from 'react'
import { Layout } from 'antd'
import {Switch, Route, Redirect} from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import User from '../user'
import Role from '../role'
import Product from '../product'
import PieChart from '../pie_chart'
import LineChart from '../line_chart'
import Home from '../home'
import Category from '../category'
import BarChart from '../bar_chart'


const { Content, Footer, Sider } = Layout;


export default class Admin extends Component {
    render() {
        const user = memoryUtil.user
        console.log(user);
        if (!user || !user.id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height:"100%"}}>
                <Sider>
                    <LeftNav>leftnav</LeftNav>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >header</Header>
                    <Content style={{ backgroundColor: 'white', margin: '20px' }}>

                            <Switch>
                                <Redirect exact from='/' to='/home'></Redirect>
                                <Route path='/user' component={User}/>
                                <Route path='/home' component={Home}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/piechart' component={PieChart}/>
                                <Route path='/linechart' component={LineChart}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/barchart' component={BarChart}/>
                                <Redirect to='/home'></Redirect>
                            </Switch>
                    
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
