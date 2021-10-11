import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './index.less'
import memoryUtil from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dataUtils'
import {reqWeather} from '../../api'

class Header extends Component {

        state = {
            currentTime: formateDate(Date.now()),
            dayPictureUrl: '',
            weather: ''
        }

        getTime = ()=>{
            setInterval(() => {
                const currentTime = formateDate(Date.now())
                this.setState({currentTime})
            }, 1000);
        }

        getWeather = async (city)=>{
            const {dayPictureUrl, weather} =  await reqWeather(city)
            this.setState({dayPictureUrl, weather})
        }

        getTitle = ()=>{
                const path = this.props.location.pathname
                console.log(path);
                
        }

        componentDidMount(){
            this.getTime()
            this.getWeather('北京')
            this.getTitle()
        }

    render() {

        const {currentTime, dayPictureUrl, weather} = this.state
        const {userName} = memoryUtil.user
        return (
            <div className='header'>
              <div className='header-top'>
                  <span>欢迎,{userName}</span>
                  <a href="https://www.baidu.com">退出</a>
              </div>
              <div className='header-bottom'>
                  <div className="header-bottom-left">首页</div>
                  <div className="header-bottom-right">{currentTime} <img src={dayPictureUrl}alt="weather" />{weather}</div>
              </div>
            </div>
        )
    }
}

export default withRouter(Header)
