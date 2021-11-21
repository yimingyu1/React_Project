import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { options } from 'less'

const { TextArea } = Input


const optionLists = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      isLeaf: false,
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
  ];

export default class AddUpdateProduct extends Component {

    state = {
        options: optionLists
    }

    formRef = React.createRef();

    submit =()=>{
        console.log(this.formRef);
        console.log(1);
        this.formRef.current.validateFields()
                .then(values=>{
                    console.log(values);
        }).catch(errorInfo =>{
            console.log(errorInfo);
        })
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
      };
    
      loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
    
        // load options lazily
        setTimeout(() => {
          targetOption.loading = false;
          targetOption.children = [
            {
              label: `${targetOption.label} Dynamic 1`,
              value: 'dynamic1',
            },
            {
              label: `${targetOption.label} Dynamic 2`,
              value: 'dynamic2',
            },
          ];
          this.setState({
              options: [...this.state.options]
          })
        }, 1000);
      };

    render() {

        const title = (
            <>
                <LinkButton><ArrowLeftOutlined style={{ fontSize: 20, fontWeight: "blod" }} onClick={() => this.props.history.goBack()} /></LinkButton>
                <span>添加商品</span>
            </>
        )

        const layout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 8 },
        };

        const tailLayout = {
            wrapperCol: { offset: 0.5, span: 16 },
          };

        return (
            <Card title={title}>
                <Form {...layout} ref={this.formRef}>
                    <Form.Item
                        label='商品名称'
                        name='productName'
                        rules={
                            [
                                {
                                    required: true,
                                    message: '商品名称不能为空'
                                }
                            ]
                        }
                    >
                        <Input placeholder='请输入商品名称' />
                    </Form.Item>
                    <Form.Item
                        label='商品描述'
                        name='productDesc'
                        rules={
                            [
                                {
                                    required: true,
                                    message: '商品描述不能为空'
                                }
                            ]
                        }
                    >
                        <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                    <Form.Item
                        label='商品价格'
                        name='price'
                        rules={
                            [
                                {
                                    required:true,
                                    message: '商品价格不能为空'
                                
                                },{
                                    validator: (_, value,callback)=>{
                                        console.log(value);
                                        if (value*1<0){
                                            callback('商品价格不能小于零')
                                        } else {
                                            callback()
                                        }
                                    }
                                }
                            ]
                        }
                    >
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
                    </Form.Item>
                    <Form.Item
                        label='商品分类'
                        name='productCategory'
                    >
                        <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} changeOnSelect />
                    </Form.Item>
                    <Form.Item
                        label='商品图片'
                        name='productImg'
                    >

                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Form.Item>
                </Form>

            </Card>
        )
    }
}
