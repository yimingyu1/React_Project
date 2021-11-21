import React, { Component } from 'react'
import { Card, Select, Input, Button, Form, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqGetProjectList ,reqUpdateProjectState} from '../../api'
import {PAGE_SIZE_OPTION} from '../../utils/constants'

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        products: [],
        loading: false,
        total: 0,
        searchInfo: {
            productName: '',
            productDesc:'',
            searchType:"1"
        },
        page: 1, 
        pageSize:10
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',
            },
            {
                title: '商品描述',
                dataIndex: 'productDesc',
                key: 'productDesc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render:(price) => '¥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                align:'center',
                width:100,
                render: (status, product) => 
                        (<>
                            <Button type='primary' onClick={() => this.changeSatus(product)}>{status === 0 ? '上架': '下架'}</Button>
                            <span>{status === 0 ? '已下架': '在售'}</span>
                        </> 
                        )

            },
            {
                title: '操作',
                dataIndex: 'option',
                key: 'option',
                align:'center',
                width: 120,
                render: (text, product) => (
                    <>
                        <LinkButton onClick={()=>this.props.history.push("/product/detail", {product})}>详情</LinkButton>
                        <LinkButton onClick={()=>this.props.history.push('/product/update')}>修改</LinkButton>
                    </>
                )
            }

        ]
    }

    constructor(props) {
        super(props)
        this.initColumns()
    }

    changeSatus =async (product)=>{
       const {id, status} = product
       const {page, pageSize} = this.state
       let result = {
        success:false,
        errMessage: '更新失败'
       }
       if (status == 0){
            result = await reqUpdateProjectState(id, 1) 
       }
       if (status == 1){
        result = await reqUpdateProjectState(id, 0) 
       }
       if (result.success === true){
           this.loadPage(page, pageSize)
       } else {
           message.error(result.errMessage)
       }
    }

    getProductList = async () => {
        this.setState({ loading: true })
        const result = await reqGetProjectList()
        this.setState({ loading: false })
        if (result.success === true) {
            this.setState({ products: result.data, total: result.paging.total})
        } else {
            message.error(result.errMessage)
        }
    }

    componentDidMount() {
        this.getProductList()
    }

    pageChange = (page, pageSize)=>{
        this.loadPage(page, pageSize)
    }

    loadPage =async (page, pageSize)=>{
        const {productName,productDesc} = this.state.searchInfo
        const result = await reqGetProjectList(productName, productDesc, (page - 1)*pageSize ,pageSize)
        if (result.success === true) {
            this.setState({ products: result.data, total: result.paging.total, page, pageSize})
        } else {
            message.error(result.errMessage)
        }
    }

    changeSearchValue = (e)=>{
        const {searchInfo} = this.state
        const {value} = e.target
        if (searchInfo.searchType === "1"){
            searchInfo.productName = value
            searchInfo.productDesc = ''
            this.setState({searchInfo})
        } 
        if (searchInfo.searchType === "2"){
            searchInfo.productName = ''
            searchInfo.productDesc = value
            this.setState({searchInfo})
        }
    }

    search = ()=>{
        this.loadPage(1, 10)
    }



    render() {

        const title = (
            <span>
                <Select defaultValue="1" style={{ width: 130 }} onChange={value => {
                    const {searchInfo} = this.state
                    const {productName, productDesc} = this.state.searchInfo
                    searchInfo.searchType = value
                    searchInfo.productName = productDesc
                    searchInfo.productDesc = productName
                    this.setState({searchInfo
                    })}}>
                    <Option value='1' key='1'>按名称搜索</Option>
                    <Option value='2' key='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} onChange={e => this.changeSearchValue(e)}></Input>
                <Button type='primary' onClick={this.search}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' icon={<PlusOutlined />} onClick={()=>this.props.history.push('/product/add')}>添加商品</Button>
        )

        const { products, total } = this.state

        return (

            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={products}
                    rowKey='id'
                    loading='true'
                    bordered='true'
                    scroll={{y: 'calc(100vh - 400px'}}
                    pagination={{
                        // hideOnSinglePage:true,
                        pageSizeOptions: PAGE_SIZE_OPTION,
                        total,
                        showSizeChanger: true,
                        responsive:true,
                        onChange: this.pageChange,
                        showTotal: (total) => { return `共${total}条` },
                    }}
                />
            </Card>
        )
    }
}
