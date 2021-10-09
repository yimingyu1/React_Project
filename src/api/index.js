import request from './request'

export const reqLogin = (userName, userPwd) => request("/login.json", {userName, userPwd}, "POST")
export const reqRegister = (userName, userPwd) => request("/register.json", {userName, userPwd}, "POST")