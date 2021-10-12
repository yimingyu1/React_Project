import myreqeust from './MyRequest'
import {message} from 'antd'
import jsonp from 'jsonp'

// 登录
export function reqLogin(userName, userPwd){
    return myreqeust("/login.json", {userName, userPwd}, "POST")
}
// 添加用户
export const reqAddUser = user => myreqeust("/register.json", user, "POST")

// 获取天气
export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url = "http://localhost:8899/admin/user/getWeather.json"
        jsonp(url, {}, (err, data)=>{
            if (!err && data.status === 'success'){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
                message.success("获取天气信息成功")
            } else {
                message.error("获取天气信息失败！", err)
            }
        })
    })
}

