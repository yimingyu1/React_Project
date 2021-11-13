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
        console.log(this.form);
        console.log(this.form.current)
        setTimeout(() => {
            this.form.current.setFieldsValue({
                categoryName
            })
        }, 100);
        
       
        return (
            <div>
                <Form ref={this.form}  >
                    <Form.Item
                    required='true'
                    label='分类名'
                    name='categoryName'
                    >
                        <Input placeholder={categoryName}></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
