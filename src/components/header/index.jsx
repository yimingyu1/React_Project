import React, { Component } from 'react'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import './index.less'
import { getDate } from '../../utils/dateUtils'
import memoryUtil from '../../utils/memoryUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import storageUtil from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
const { confirm } = Modal;
class Header extends Component {

    state = {
        currentDate: getDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentDate = getDate(Date.now())
            this.setState({ currentDate })
        }, 1000);
    }

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather()
        this.setState({ dayPictureUrl, weather })
    }


    getTitle = (path, menuList) => {
        menuList.find((item) => {
            if (!item.children) {
                if (item.key === path) {
                    this.title = item.title
                    // console.log(this.memuItem);
                    return true
                }
            } else {
                // return false
                // console.log(1);
                return this.getTitle(path, item.children)
            }
        })
    }

    quit = () => {
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=> {
                memoryUtil.user = {}
                storageUtil.delUser()
                this.props.history.replace('/login')
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {

        const { currentDate, dayPictureUrl, weather } = this.state
        const { userName } = memoryUtil.user
        const path = this.props.location.pathname
        this.getTitle(path, menuList)
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎, {userName}</span>
                    <LinkButton onClick={this.quit}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">{this.title}</div>
                    <div className="header-bottom-right">{currentDate}<img src={dayPictureUrl} alt="qing" />{weather}</div>
                </div>

            </div>
        )
    }
}
export default withRouter(Header)
