import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu } from 'antd'
import { Header, Footer, ProductIntro, ProductComments } from '../../components'
import styles from './DetailPage.module.css'
import { commentMockData } from './mockup'

interface MatchParams {
  touristRouteId: string
}

const { RangePicker } = DatePicker

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 起一个koa2服务返回数据
        // const { data } = await axios.get(`http://localhost:5000/api/touristRoutes/${touristRouteId}`)
        // 请求本地json
        const { data } = await axios.get(`/mock.json?id=${touristRouteId}`)
        console.log(data)
        setProduct(data.result)
        setLoading(false)
      } catch (err: any) {
        setProduct(null)
        setLoading(false)
        setError(err.message)
      }
    }
    fetchData()
  }, [touristRouteId])

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          margin: '50vh auto',
          width: '100%',
        }}
      />
    )
  }
  if (error) {
    return <div>网站出错：{error}</div>
  }
  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 产品简介与日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.price}
                coupons={product.coupons}
                points={product.points}
                discount={product.discountPresent}
                rating={product.rating}
                pictures={product.touristRoutePictures.map(p => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles['product-detail-anchor']}>
          <Menu mode='horizontal'>
            <Menu.Item key='1'>
              <Anchor.Link href='#feature' title='产品特色'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Anchor.Link href='#fees' title='费用'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Anchor.Link href='#notes' title='预订须知'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key='5'>
              <Anchor.Link href='#comments' title='用户评价'></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id='feature' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          {/* 处理html字符串 */}
          <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
        </div>
        {/* 费用 */}
        <div id='fees' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
        </div>
        {/* 预定须知 */}
        <div id='notes' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
        </div>
        {/* 产品评价 */}
        <div id='comments' className={styles['product-detail-container']}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
      <Footer />
    </>
  )
}
