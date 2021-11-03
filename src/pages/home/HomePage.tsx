import React from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from '../../components/index'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { giveDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList1: state.recommendProducts.productList1,
    productList2: state.recommendProducts.productList2,
    productList3: state.recommendProducts.productList3,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    giveMeData: () => {
      dispatch(giveDataActionCreator())
    },
  }
}

type PropsType = WithTranslation & // 定义i18n props类型
  ReturnType<typeof mapStateToProps> & // 映射的是redux state的类型
  ReturnType<typeof mapDispatchToProps> // 映射的是redux dispatch的类型

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData()
  }
  render() {
    const { t } = this.props
    const { productList1, productList2, productList3, loading, error } = this.props

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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))
