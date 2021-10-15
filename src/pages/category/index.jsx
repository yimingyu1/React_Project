import React, { Component } from 'react'
import { Card, Table, Button, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
import LinkButton from '../../components/link-button'
import { reqAddCategory, reqCategoryByParentId, reqCategoryByType, reqUpdateCategory } from '../../api'


export default class Category extends Component {

    state = {
        loading: false,
        categorys: []
    }

    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'categoryName',
                key: 'categoryName',
            },
            {
                title: '操作',
                dataIndex: 'opt',
                key: 'opt',
                align: 'center',
                width: 300,
                render: () => (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            }];
    }
    constructor(props) {
        super(props)
        this.initColumns()
    }

    getCategorys = async (type)=>{
        this.setState({loading: true})
        const result = await reqCategoryByType(type)
        this.setState({loading: false})
        if (result.success === true){
            const categorys = result.data
            this.total = result.paging.total
            this.setState({categorys})
            message.success('获取列表信息成功')
        } else {
            message.error('获取列表信息失败')
        }
        
    }

    pageChange = async (page, pageSize)=>{
        console.log(page, pageSize);
        this.loadPage(page, pageSize)
    }

    loadPage = async (page, pageSize, parent=0, type=1) => {
        this.setState({loading: true})
        let result = {}
        if (parent === 0){
            result = await reqCategoryByType(type, (page -1)*pageSize, pageSize)
        } else {
            result = await reqCategoryByParentId(type, parent, (page -1)*pageSize, pageSize)
        }
        this.setState({loading: false})
        if (result.success === true){
            const categorys = result.data
            this.total = result.paging.total
            this.setState({categorys})
            message.success('获取列表信息成功')
        } else {
            message.error('获取列表信息失败')
        }
    }

    componentDidMount() {
        this.getCategorys(1)
    }

    render() {

        const {categorys, loading} = this.state
        return (
            <Card title='一级分类列表' extra={<Button type='primary' icon={<PlusOutlined />}>添加</Button>} >
                <Table 
                dataSource={categorys} 
                columns={this.columns} 
                asdfasdfasdf
                bordered
                rowKey='id' 
                loading={loading}
                scroll={{y: 'calc(100vh - 400px)'}}
                pagination={{
                    pageSizeOptions: [10, 20, 30, 50],
                    responsive: true,
                    showSizeChanger: true,
                    total : this.total,
                    onChange: this.pageChange,
                    showTotal:(total)=>{ return `共${total}条`},
                }} 
                 ></Table>
            </Card>
        )
    }
}
