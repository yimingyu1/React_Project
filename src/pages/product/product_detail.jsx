import React, { Component } from 'react'
import {Card, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
<ArrowLeftOutlined />
export default class ProductDetail extends Component {
    render() {

        const {productName, productDesc, price, productImages} = this.props.history.location.state.product

        const title = (
            <>
            <LinkButton><ArrowLeftOutlined style={{fontSize:20, fontWeight:'bold'}} onClick={()=>this.props.history.goBack()}/></LinkButton><span>商品详情</span>
            </>
        )
        return (
            <Card title={title}>
                <List className='productDetailList'>
                    <List.Item >
                        <span className="productDetailListLeft">商品名称：</span>
                        <span>{productName}</span>
                    </List.Item>
                    <List.Item>
                        <span className="productDetailListLeft">商品描述：</span>
                        <span>{productDesc}</span>
                    </List.Item>
                    <List.Item>
                        <span className="productDetailListLeft">商品价格：</span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className="productDetailListLeft">商品图片：</span>
                        {
                            productImages.map((item)=>{
                                return <img key={item} src={item} className='product-img'/>
                            })
                        }
                    </List.Item>
                    <List.Item>
                        <span className="productDetailListLeft">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: '<p style="color:red">这是商品详情</p>'}}></span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
