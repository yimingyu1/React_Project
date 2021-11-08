import React, { Component } from 'react'
import {Form, Input, Select} from 'antd'
import './index.less'
const { Option } = Select;
const firstCategory={
    id:0,
    categoryName: '一级分类列表',
    categoryType: 0
}

export default class CategoryForm extends Component {

    render() {

        let categoryList = [firstCategory, ...this.props.categorys]
        return (
            <div>
                <Form.Item 
                    label='所属分类'
                    required='true'
                    initialValue='0'
                    name='categoryId'
                >
                    <Select placeholder="一级分类列表">
                            {
                                categoryList.map((item)=>{
                                    return <Option value={item.id} key={item.id}>{item.categoryName}</Option>
                                })
                            }
                    </Select>
                </Form.Item>
                <Form.Item
                label='分类名称'
                required='true'
                name='cagetoryName'
                rules={
                    [
                        {required:true, message: '请输入与分类名称'}
                    ]
                }
                >
                    <Input placeholder="请输入分类名称"></Input>
                </Form.Item>
            </div>
        )
    }
}
