import axios from 'axios'
import {message} from 'antd'

// const host = "http://localhost:8899//admin/user"

export default function myreqeust(url, data={}, method="GET"){
    // url = host + url
    return new Promise((resolve, reject) => {
        let promise
        if ("GET" === method){
            promise = axios.get(url,{
                params: data
            })
        } else if ("POST" === method){
            promise = axios.post(url, data)
        }
        promise.then(response =>{
            resolve(response.data)
        }).catch(error =>{
            message.error(error.message)
        })
    })
    
}