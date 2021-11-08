import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './index.less'
import LinkButton from '../../components/link-button'
import { reqAddCategory, reqCategoryByParentId, reqCategoryByType, reqUpdateCategory } from '../../api'
import CategoryForm  from '../../components/cateogry-form'
import CategoryUpdateForm from '../../components/category-update-form'


export default class Category extends Component {

    state = {
        loading: false,
        categorys: [],
        ParentId: 0,
        categoryType: 1,
        categoryName: "",
        showState:0,
        page: 1,
        pageSize: 10,
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
                render: (text, category) => (
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.categoryType === 1 ? <LinkButton onClick={() => { this.getSubCategory(category) }} >查看子分类</LinkButton> : null}
                    </span>
                )
            }];
    }
    constructor(props) {
        super(props)
        this.initColumns()
    }

    getSubCategory = (category) => {
        console.log(category);
        const { id, categoryName, categoryType } = category
        this.setState({ categoryName, ParentId: id, categoryType: categoryType + 1 }, () => {
            this.loadPage(1, 10)
        })
    }

    goBack = () => {
        const { categoryType } = this.state
        this.setState({ categoryName: "", ParentId: 0, categoryType: categoryType - 1 }, () => {
            this.loadPage(1, 10)
        })
    }

    getCategorys = async (type) => {
        this.setState({ loading: true })
        const result = await reqCategoryByType(type)
        this.setState({ loading: false })
        if (result.success === true) {
            this.categorys = result.data
            this.total = result.paging.total
            this.setState({ categorys:this.categorys })
            message.success('获取列表信息成功')
        } else {
            message.error('获取列表信息失败')
        }

    }



    pageChange = async (page, pageSize) => {
        this.loadPage(page, pageSize)
    }

    loadPage = async (page, pageSize) => {
        this.setState({ loading: true, page, pageSize })
        console.log(this.state);
        const { ParentId, categoryType } = this.state
        let result = {}
        if (ParentId === 0) {
            result = await reqCategoryByType(categoryType, (page - 1) * pageSize, pageSize)
        } else {
            result = await reqCategoryByParentId(categoryType, ParentId, (page - 1) * pageSize, pageSize)
        }
        this.setState({ loading: false })
        if (result.success === true) {
            const categorys = result.data
            this.total = result.paging.total
            this.setState({ categorys })
            // message.success('获取列表信息成功')
        } else {
            message.error('获取列表信息失败')
        }
    }

    handleCanel = ()=>{
        this.setState({showState:0})
    }

    showAdd = ()=>{
        this.setState({showState:1})
    }

    showUpdate=(category)=>{
        this.category = category
        this.setState({showState:2})
    }

    updateCategory =async (id, form)=>{
        console.log("update category");
        console.log(form.current.getFieldValue("categoryName"));
        this.setState({showState: 0})
        const {page, pageSize} = this.state
        
        const result =  await reqUpdateCategory(id, form.current.getFieldValue("categoryName"))
        if (result.success === true){
            console.log(page, pageSize);
            this.pageChange(page, pageSize)
            message.success('更新列表信息成功')
        } else {
            message.error(result.errMessage)
        }
    }




    componentDidMount() {
        const { categoryType } = this.state
        console.log(categoryType);
        this.getCategorys(categoryType)
    }

    render() {

        const { categorys, loading, categoryName, categoryType, showState } = this.state

        const title = categoryType === 1 ? '一级分类列表' : <span>
            <LinkButton onClick={this.goBack}>一级分类列表</LinkButton>
            <ArrowRightOutlined style={{ marginRight: 20 }} />
            {categoryName}
        </span>

        return (
            <Card title={title} extra={<Button type='primary' icon={<PlusOutlined />} onClick={this.showAdd}>添加</Button>} >
                <Table
                    dataSource={categorys}
                    columns={this.columns}
                    bordered
                    rowKey='id'
                    loading={loading}
                    scroll={{ y: 'calc(100vh - 400px)' }}
                    pagination={{
                        pageSizeOptions: [10, 20, 30, 50],
                        responsive: true,
                        showSizeChanger: true,
                        total: this.total,
                        onChange: this.pageChange,
                        showTotal: (total) => { return `共${total}条` },
                    }}
                ></Table>
                <Modal title="添加分类" visible={showState === 1} onOk={""} onCancel={this.handleCanel}>
                    <CategoryForm categorys={this.categorys}/>
                </Modal>
                <Modal 
                title="更新分类" 
                visible={showState ===2} 
                onOk={()=> this.updateCategory(this.category.id, this.form)} 
                onCancel={this.handleCanel}
                >
                   <CategoryUpdateForm category={ this.category } getCategoryName = {(form) => this.form = form}/>
                </Modal>
            </Card>
        )
    }
}
