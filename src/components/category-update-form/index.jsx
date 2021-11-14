import React, { Component } from 'react'
import {Form, Input} from 'antd'

export default class CategoryUpdateForm extends Component {


    constructor(props){
        super(props)
        this.form = React.createRef()
        const {getCategoryName} = this.props
        getCategoryName(this.form)
        console.log(this.form);
    }


    render() {
        const {categoryName} = this.props.category || {}
        setTimeout(() => {
            if (this.form.current !== null){
            this.form.current.setFieldsValue({
                categoryName
            })
        }
        }, 100);
        
       
        return (
            <div>
                <Form ref={this.form}  >
                    <Form.Item
                    required='true'
                    label='分类名'
                    name='categoryName'
                    rules={
                        [
                            {required: true, message: "分类名不能为空"}
                        ]
                    }
                    >
                        <Input placeholder={categoryName}></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
