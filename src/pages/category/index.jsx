import React, { Component } from 'react'
import {Card, Table, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import Form from 'rc-field-form/es/Form';
export default class Category extends Component {

    
    render() {

        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ];

          const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
          ];

        return (
            <Card title='一级分类列表' extra={<Button type='primary' icon={<PlusOutlined />}>添加</Button>}>
                <Table dataSource={dataSource} columns={columns}></Table>
            </Card>
        )
    }
}
