import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

/**
 * 登录的路由组件
 */

export default class Login extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    aa = ()=>{
        console.log(this.formNode);
        let p = new Promise((resolve, reject)=>{
            setTimeout(() => {
                console.log("执行完成promise");
                resolve("resolve")
            }, 2000);
        
        })
        console.log(2);
    }

    validatePwd = (_, value)=>{
        const regPwd = /^(\w)+$/
        if (!regPwd.test(value)){
            return Promise.reject(new Error('密码只能由字母、数字、下划线组成'))
        }
        if (value.length < 4){
            return Promise.reject(new Error('密码长度必须大于4位'))
        }
        if (value.length > 12){
            return Promise.reject(new Error('密码长度必须小于12位'))
        }
        return Promise.resolve()
    }


    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <div className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        ref = {c => this.formNode = c}
                    >
                        <Form.Item
                            name="username"
                            validateFirst="true"
                            rules={
                                [
                                { required: true, whitespace: true,  message: '请输入用户名' },
                                { pattern: /^(\w)+$/, message: '用户名只能由字母、数字、下划线组成' },
                                {min: 5, message: '用户名长度必须大于4位'},
                                {max: 12, message: '用户名不能超过12位'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, whitespace: true, message: '请输入密码' },
                                {validator: this.validatePwd}
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox >记住账号</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                登录
                            </Button>
                            或者 <a href="">立即注册</a>
                        </Form.Item>
                    </Form>
                </div>
                <button onClick={this.aa}>+</button>
            </div>
            
        )
    }
}
