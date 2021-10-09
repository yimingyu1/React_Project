import axios from 'axios'
import {message} from 'antd'

export default  function request(url, data={},method="GET",){
    return new Promise((resolve, reject) =>{
    let promise
    if (method === "GET"){
        promise =  axios.get(url, {
            params: data
        })
    } else if (method === "POST"){
        promise =  axios.post(url, data)
    }
    promise.then(response => {
        resolve(response.data)
    }).catch(error =>{
        message.error(error.message)
    })
})

}