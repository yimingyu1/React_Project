import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link, withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        return menuList.map((item =>{
            if (!item.children){
                return (
                    <Menu.Item key={item.key} icon={item.icon} style={{margin: '0'}}>
                            <Link to={item.key}>{item.title}</Link> 
                        </Menu.Item>
                )
            } else {

                const citem = item.children.find(citem => citem.key === this.path)
                console.log(this.path);
                if (citem){
                    this.OpenKey = item.key
                }
                console.log(this.OpenKey);
                return (
                    
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                           
                        }
                    </SubMenu>
                )
            }
        }))
    }

    constructor(props){
        super(props)
        this.path = this.props.location.pathname
        this.MenuNodes = this.getMenuNodes(menuList)
       
    }

    render() {
        
        this.path = this.props.location.pathname

        return (
            <div>
                <div className='left_nav'>
                    <Link to='/' className='left-nav-header'>
                        <img src={logo} alt="logo" />
                        <h1>admin</h1>
                    </Link>
                </div>
                <div>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[this.OpenKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            this.MenuNodes
                        }
{/*                         
                        <Menu.Item key="home_page" icon={<HomeOutlined />} style={{margin: '0'}}>
                            <Link to='/home'>首页</Link> 
                        </Menu.Item>
                        <SubMenu key="product" icon={<AppstoreOutlined />} title="商品">
                            <Menu.Item key="category_management" icon={<UnorderedListOutlined/>}>
                                <Link to='/category'>品类管理</Link> 
                            </Menu.Item>
                            <Menu.Item key="project_management" icon={<ShoppingCartOutlined />}>
                               <Link to='/product'>商品管理</Link> 
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key='user_management'icon={<UserOutlined />}>
                            <Link to='/user'>用户管理</Link>
                        </Menu.Item>
                        <Menu.Item key='role_management'icon={<UserSwitchOutlined />}>
                            <Link to='/role'>角色管理</Link>
                        </Menu.Item>
                        <SubMenu key="chart" icon={<AreaChartOutlined />} title="图形图表">
                            <Menu.Item key="bar_chart" icon={<BarChartOutlined />}>
                                <Link to='/barchart'>柱状图</Link>
                            </Menu.Item>
                            <Menu.Item key="line_chart" icon={<LineChartOutlined />}>
                                <Link to='/linechart'>折线图</Link>
                            </Menu.Item>
                            <Menu.Item key="pie_chart" icon={<PieChartOutlined />}>
                                <Link to='/piechart'>饼状图</Link>
                            </Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withRouter(LeftNav)
