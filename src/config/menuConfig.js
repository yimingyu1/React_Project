import {
    AppstoreOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    LineChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <HomeOutlined/>,
    },
    {
        title: '商品',
        key: '/productSet',
        icon: <AppstoreOutlined/>,
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: <UnorderedListOutlined/>,
            },
            {
                title: '商品管理',
                key: '/product',
                icon: <ShoppingCartOutlined/>,
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <UserOutlined/>,
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <UserSwitchOutlined/>,
    },
    {
        title: '图形图表',
        key: '/chart',
        icon: <AreaChartOutlined/>,
        children: [
            {
                title: '柱状图',
                key: '/barchart',
                icon: <BarChartOutlined/>,
            },
            {
                title: '折线图',
                key: '/linechart',
                icon: <LineChartOutlined/>,
            },
            {
                title: '饼状图',
                key: '/piechart',
                icon: <PieChartOutlined/>
            }
        ]
    }
]
export default menuList