import myreqeust from './MyRequest'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export function reqLogin(userName, userPwd){
    return myreqeust("/login.json", {userName, userPwd}, "POST")
}
// 添加用户
export const reqAddUser = user => myreqeust("/register.json", user, "POST")
// 查询天气

export const reqWeather = (city) => {
    return new Promise((resolve, reject)=>{
        const url = `http://localhost:8899/api/admin/user/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) =>{
            if (!error && data.status === 'success'){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                console.log( {dayPictureUrl, weather});
                resolve({dayPictureUrl, weather})
            } else {
                message.error("获取天气信息失败！")
            }
        })
    })
    
}
reqWeather('北京')
