import myreqeust from './MyRequest'

// 登录
export function reqLogin(userName, userPwd){
    return myreqeust("/login.json", {userName, userPwd}, "POST")
}
// 添加用户
export const reqAddUser = user => myreqeust("/register.json", user, "POST")

