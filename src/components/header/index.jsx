import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import memoryUtil from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dataUtils'
import menuList from '../../config/menuConfig'
import storageUtil from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import LinkButton from '../../components/link-button'

const { confirm } = Modal;
class Header extends Component {

        state = {
            currentTime: formateDate(Date.now()),
            dayPictureUrl: '',
            weather: ''
        }

        getTime = ()=>{
            this.intervalId = setInterval(() => {
                const currentTime = formateDate(Date.now())
                this.setState({currentTime})
            }, 1000);
        }

        getWeather = async (city)=>{
            const {dayPictureUrl, weather} =  await reqWeather(city)
            this.setState({dayPictureUrl, weather})
        }

        getTitle = (path, meList)=>{
            if (meList){}
            meList.forEach((Item) => {
                if (!Item.children){
                    if (path === Item.key){
                        this.title = Item.title
                        return 
                    } 
                }else {
                    this.getTitle(path, Item.children)
                }
            })
            

        }

        quit = ()=>{
            confirm({
                title: '确定要退出登录吗?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                  console.log('OK');
                    storageUtil.delUser()
                    memoryUtil.user = {}
                    this.props.history.replace('/login')
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
        }

        componentDidMount(){
            this.getTime()
            this.getWeather('北京')
            
            console.log(Date.now());
        }

        componentWillUnmount(){
            clearInterval(this.intervalId)
        }

    render() {
        const path = this.props.location.pathname
        const {currentTime, dayPictureUrl, weather} = this.state
        const {userName} = memoryUtil.user
        this.getTitle(path, menuList)
        return (
            <div className='header'>
              <div className='header-top'>
                  <span>欢迎,{userName}</span>
                  <LinkButton onClick={this.quit}>退出</LinkButton>
              </div>
              <div className='header-bottom'>
                  <div className="header-bottom-left">{this.title}</div>
                  <div className="header-bottom-right">{currentTime} <img src={dayPictureUrl}alt="weather" />{weather}</div>
              </div>
            </div>
        )
    }
}

export default withRouter(Header)
