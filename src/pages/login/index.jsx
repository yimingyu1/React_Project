import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };


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
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" >
                                <Checkbox >Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
