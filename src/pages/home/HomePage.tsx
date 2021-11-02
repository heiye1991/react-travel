import React from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from '../../components/index'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'

interface State {
  loading: boolean
  error: string | null
  productList1: any[]
  productList2: any[]
  productList3: any[]
}

class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      productList1: [],
      productList2: [],
      productList3: [],
    }
  }
  componentDidMount() {
    // 获取每个旅游栏目的数据列表
    function getProducts(catgoryID: number) {
      return axios.post('https://vacations.ctrip.com/restapi/gateway/14422/displayWindow', {
        catgoryID,
        channel: 'Online',
        siteID: 1,
        startCity: 1,
        version: 'B',
      })
    }
    // 处理获取到的数据列表
    function dealProducts(arr: any[]) {
      const products: any[] = []
      for (const item of arr) {
        products.push({
          id: item.id,
          price: item.price,
          title: item.name,
          touristRoutePictures: [
            {
              url: item.img,
            },
          ],
        })
      }
      return products
    }
    axios
      .all([getProducts(1), getProducts(2), getProducts(3)])
      .then(
        axios.spread((res1, res2, res3) => {
          const arr1 = res1.data.displayWindowModels[0].tabList[0].products
          const products1 = dealProducts(arr1)

          const arr2 = res2.data.displayWindowModels[0].tabList[0].products
          const products2 = dealProducts(arr2)

          const arr3 = res1.data.displayWindowModels[0].tabList[0].products
          const products3 = dealProducts(arr3)

          this.setState({
            loading: false,
            error: null,
            productList1: products1,
            productList2: products2,
            productList3: products3,
          })
        }),
      )
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message,
        })
      })
  }
  render() {
    const { t } = this.props
    const { productList1, productList2, productList3, loading, error } = this.state

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
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type='warning'>
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage1}
            products={productList1}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type='danger'>
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type='success'>
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
          <BusinessPartners />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = withTranslation()(HomePageComponent)
