import React, { Component } from 'react'
import {Form, Input, message, Select} from 'antd'
import './index.less'
import {reqCategoryByType} from '../../api'
const { Option } = Select;
const firstCategory={
    id:0,
    categoryName: '一级分类列表',
    categoryType: 0
}

export default class CategoryForm extends Component {

    

    constructor(props){
        super(props)
        this.form = React.createRef()
        const {getCategoryInfo} = this.props
        getCategoryInfo(this.form)
        
    }



    render() {
        const {parentId, allCategroyList} = this.props
        const categoryList = [firstCategory, ...allCategroyList]
        setTimeout(() => {
            this.form.current.setFieldsValue({
                parentId

            })
            this.form.current.resetFields(['categoryName'])
        }, 100);
        return (
            <div>
                <Form ref={this.form}>
                    <Form.Item 
                        label='所属分类'
                        required='true'
                        name='parentId'
                        initialValue= {parentId}
                    >
                        <Select placeholder="一级分类列表">
                                {
                                    categoryList.map((item)=>{
                                        return <Option value={item.id} key={item.id} >{item.categoryName}</Option>
                                    })
                                }
                        </Select>
                    </Form.Item>
                    <Form.Item
                    label='分类名称'
                    required='true'
                    name='categoryName'
                    rules={
                        [
                            {required:true, message: '请输入与分类名称'}
                        ]
                    }
                    >
                        <Input 
                        placeholder="请输入分类名称" 
                        ></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
